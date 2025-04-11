import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import FloatingActionButton, { FloatingActionButtonProps } from './FloatingActionButton';

export default {
  title: 'Shared/FloatingActionButton',
  component: FloatingActionButton,
} as Meta<typeof FloatingActionButton>;

const Template: StoryFn<FloatingActionButtonProps> = (args: FloatingActionButtonProps) => (
  <FloatingActionButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: 'plus',
  position: 'bottom-right',
};

export const DifferentPosition = Template.bind({});
DifferentPosition.args = {
  icon: 'edit',
  position: 'top-left',
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  icon: 'settings',
  tooltip: 'Settings',
  position: 'bottom-right',
};
