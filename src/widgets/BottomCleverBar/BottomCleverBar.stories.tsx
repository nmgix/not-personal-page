import type { Args, Meta, StoryObj } from "@storybook/react";

import { BottomCleverBar } from "@/widgets/BottomCleverBar";

const meta = {
  title: "Widgets/BottomCleverBar",
  component: BottomCleverBar,
  args: {}
} satisfies Meta<typeof BottomCleverBar>;

const CleverBarInterscetionExamle = (args: Args) => (
  <>
    <div style={{ backgroundColor: "red", width: 50, height: 40, position: "absolute", left: 332, top: 5 }} />
    <BottomCleverBar {...args} />
  </>
);

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CleverBarInterscetionExamle />
};
