import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import UserPreferences, { UserPreferencesProps } from './UserPreferences';

export default {
  title: 'Features/Profile/UserPreferences',
  component: UserPreferences,
} as Meta<typeof UserPreferences>;

const Template: StoryFn<UserPreferencesProps> = (args: UserPreferencesProps) => (
  <UserPreferences {...args} />
);

export const Default = Template.bind({});
Default.args = {
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'en',
  },
  onPreferenceChange: (key: string, value: any) => 
    console.log(`Preference changed: ${key}=${value}`),
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  preferences: {
    theme: 'dark',
    notifications: false,
    language: 'en',
  },
  onPreferenceChange: (key: string, value: any) => 
    console.log(`Preference changed: ${key}=${value}`),
};
