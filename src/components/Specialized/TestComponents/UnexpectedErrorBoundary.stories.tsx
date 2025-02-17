import type { Meta, StoryObj } from "@storybook/react";

import { UnexpectedErrorBoundary } from "./UnexpectedErrorBoundary";

const meta = {
  title: "Specialized/TestComponents/UnexpectedErrorBoundary",
  component: UnexpectedErrorBoundary,
  args: {}
} satisfies Meta<typeof UnexpectedErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
