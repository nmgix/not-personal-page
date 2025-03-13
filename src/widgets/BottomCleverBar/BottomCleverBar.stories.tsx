import type { Meta, StoryObj } from "@storybook/react";

import { BottomCleverBar } from "@/widgets/BottomCleverBar";
import { BarTypes } from "./serverutils";

const meta = {
  title: "Widgets/BottomCleverBar",
  component: BottomCleverBar,
  args: {}
} satisfies Meta<typeof BottomCleverBar>;

const CleverBarIntersectionExample = (args: Story["args"]) => (
  <>
    <div style={{ backgroundColor: "red", width: 200, height: 40, position: "absolute", left: "40vw", top: 5 }} />
    <BottomCleverBar {...args} />
  </>
);

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentBars: BarTypes["articles"].bars,
    hideInTop: BarTypes["articles"].hideInTop
  },
  render: args => <CleverBarIntersectionExample {...args} />
};
