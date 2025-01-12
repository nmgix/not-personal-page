import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "@/components/Specialized/Footer";

const meta = {
  title: "Specialized/Footer",
  component: Footer,
  args: {}
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
