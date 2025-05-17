/**
 * Common utility functions for IndiCab project
 */

export function sanitizeInput(_input: string): string {
    // Basic HTML sanitization
    return _input.replace(/<[^>]*>?/gm, '');
}

export function formatCurrency(_amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(_amount);
}

export function calculateDistance(lat1: number, _lon1: number, lat2: number, _lon2: number): number {
    // Haversine formula implementation
    const _R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (_lon2 - _lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const _c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return _R * _c;
}

export function debounce<T extends (...args: any[]) => any>(
    _func: T,
    _wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => _func(...args), _wait);
    };
}

export function isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

export function generateUniqueId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function getDatabaseConnection() {
    try {
        const _connection = await pool.connect();
        return _connection;
    } catch (_error) {
        throw new Error(`Database connection failed: ${_error.message}`);
    }
}
