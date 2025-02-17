import type { Meta, StoryObj } from "@storybook/react";

import { BoundaryRender } from "./Boundary";

const meta = {
  title: "Specialized/TestComponents/Boundary",
  component: BoundaryRender,
  args: {}
} satisfies Meta<typeof BoundaryRender>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setFoundOut: (foundOut: boolean) => alert(`found out: ${foundOut}`),
    active: true,
    since: new Date()
  }
};
