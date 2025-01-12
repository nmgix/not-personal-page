import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@/components/Specialized/Header";

const meta = {
  title: "Specialized/Header",
  component: Header,
  args: {}
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
