import React from 'react';

export interface UserPreferencesProps {
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
  onPreferenceChange: (key: string, value: any) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ 
  preferences, 
  onPreferenceChange 
}) => {
  return (
    <div className="user-preferences">
      <h2>User Preferences</h2>
      <div className="preference-item">
        <label>
          Theme:
          <select 
            value={preferences.theme}
            onChange={(e) => onPreferenceChange('theme', e.target.value)}
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
            onChange={(e) => onPreferenceChange('notifications', e.target.checked)}
          />
        </label>
      </div>
      <div className="preference-item">
        <label>
          Language:
          <input
            type="text"
            value={preferences.language}
            onChange={(e) => onPreferenceChange('language', e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default UserPreferences;
