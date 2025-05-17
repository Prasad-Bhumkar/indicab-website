import React from 'react';

export interface UserPreferencesProps {
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
        language: string;
    };
    onPreferenceChange: (key: string, value: any) => void;
}

const _UserPreferences: React.FC<UserPreferencesProps> = ({
    preferences,
    onPreferenceChange
}): JSX.Element => {
    return (
        <div className="user-preferences">
            <h2>User Preferences</h2>
            <div className="preference-item">
                <label>
                    Theme:
                    <select
                        value={preferences.theme}
                        onChange={(_e) => onPreferenceChange('theme', _e.target.value)}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
            <div className="preference-item">
                <label>
                    Notifications:
                    <input
                        type="checkbox"
                        checked={preferences.notifications}
                        onChange={(_e) => onPreferenceChange('notifications', _e.target.checked)}
                    />
                </label>
            </div>
            <div className="preference-item">
                <label>
                    Language:
                    <input
                        type="text"
                        value={preferences.language}
                        onChange={(_e) => onPreferenceChange('language', _e.target.value)}
                    />
                </label>
            </div>
        </div>
    );
};

export default _UserPreferences;
