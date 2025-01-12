import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "@/widgets/Footer";

const meta = {
  title: "Widgets/Footer",
  component: Footer,
  args: {}
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
