import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@/app/components/Header";

const meta = {
  title: "Pages/Header",
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
