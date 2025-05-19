'use client';

import { trackEvent } from '@/utils/analytics';
import { AlertTriangle, Bell, Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import wsService from '../../utils/websocket';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
}

interface NotificationPayload {
    id: string;
    type: NotificationType;
    message: string;
    timestamp: string;
}

export const NotificationsPanel = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Fetch notifications
        const fetchNotifications = async () => {
            try {
                const response = await fetch('/api/admin/notifications');
                const data = await response.json();
                setNotifications(data);
                setUnreadCount(data.filter(n => !n.read).length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        // Connect to WebSocket when component mounts
        wsService.connect();

        // Subscribe to notification events
        const handleNotification = (data: NotificationPayload) => {
            const newNotification: Notification = {
                id: data.id,
                type: data.type,
                message: data.message,
                timestamp: new Date(data.timestamp),
                read: false,
                title: ''
            };
            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prevUnreadCount => prevUnreadCount + 1);
        };

        wsService.subscribe('notification', handleNotification);

        // Track panel open/close
        trackEvent({
            category: 'Notifications',
            action: isOpen ? 'Open Panel' : 'Close Panel'
        });

        return () => {
            wsService.unsubscribe('notification', handleNotification);
            wsService.disconnect();
        };
    }, [isOpen]);

    const markAsRead = async (id: string) => {
        try {
            await fetch(`/api/admin/notifications/${id}/read`, { method: 'POST' });
            setNotifications(notifications.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            ));
            setUnreadCount(prevUnreadCount => prevUnreadCount - 1);
            trackEvent({
                category: 'Notifications',
                action: 'Mark as Read',
                label: id
            });
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const clearAll = () => {
        setNotifications([]);
        setUnreadCount(0);
        trackEvent({
            category: 'Notifications',
            action: 'Clear All'
        });
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'success':
                return <Check className="w-5 h-5 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'error':
                return <X className="w-5 h-5 text-red-500" />;
            default:
                return <Bell className="w-5 h-5 text-blue-500" />;
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => handleKeyPress(e, () => setIsOpen(!isOpen))}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative"
                aria-label="Toggle notifications"
                aria-expanded={isOpen}
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <dialog
                    open
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"
                    aria-label="Notifications panel"
                >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                        <button
                            type="button"
                            onClick={clearAll}
                            onKeyDown={(e) => handleKeyPress(e, clearAll)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                            aria-label="Clear all notifications"
                        >
                            Clear all
                        </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No notifications
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <button
                                    key={notification.id}
                                    type="button"
                                    className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 ${
                                        !notification.read ? 'bg-blue-50' : ''
                                    }`}
                                    onClick={() => markAsRead(notification.id)}
                                    onKeyDown={(e) => handleKeyPress(e, () => markAsRead(notification.id))}
                                    aria-label={`${notification.title} - ${notification.timestamp.toLocaleTimeString()}`}
                                >
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm text-gray-900">
                                                {notification.title}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {notification.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </dialog>
            )}
        </div>
    );
} 