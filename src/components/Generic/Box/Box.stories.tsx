import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "./Box";

const meta = {
  title: "Generic/Box",
  component: Box,
  args: {}
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    styles: { width: "150px", height: "75px" }
  }
};

export const SmallBox: Story = {
  args: {
    styles: { width: "50px", height: "15px" }
  }
};
