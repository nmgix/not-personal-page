import type { Meta, StoryObj } from "@storybook/react";

import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import { mockList } from "@/types/mocks";

const meta = {
  title: "Specialized/BoxesScrollbar",
  component: BoxesScrollbar,
  args: {}
} satisfies Meta<typeof BoxesScrollbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    list: mockList
  }
};
