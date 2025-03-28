import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "@/app/components/Footer";

const meta = {
  title: "Pages/Footer",
  component: Footer,
  args: {}
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
