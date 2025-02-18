import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@/widgets/Header";

const meta = {
  title: "Widgets/Header",
  component: Header,
  args: {}
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    homeHref: "/"
  }
};
