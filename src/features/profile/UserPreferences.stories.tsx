import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import _UserPreferences, { UserPreferencesProps } from './UserPreferences';

export default {
    title: 'Features/Profile/UserPreferences',
    component: _UserPreferences,
} as Meta<typeof _UserPreferences>;

const Template: StoryFn<UserPreferencesProps> = (args: UserPreferencesProps): JSX.Element => (
    <_UserPreferences {...args} />
);

export const _Default = Template.bind({});
_Default.args = {
    preferences: {
        theme: 'light',
        notifications: true,
        language: 'en',
    },
    onPreferenceChange: (_key: string, _value: any) =>
        console.log(`Preference changed: ${_key}=${_value}`),
};

export const _DarkTheme = Template.bind({});
_DarkTheme.args = {
    preferences: {
        theme: 'dark',
        notifications: false,
        language: 'en',
    },
    onPreferenceChange: (_key: string, _value: any) =>
        console.log(`Preference changed: ${_key}=${_value}`),
};
