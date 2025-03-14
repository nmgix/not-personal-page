import type { Meta, StoryObj } from "@storybook/react";

import { LatestBox } from "./LatestBox";
import { mockProjectsShortened } from "@/types/mocks";

const meta = {
  title: "Widgets/LatestBox",
  component: LatestBox,
  args: {}
} satisfies Meta<typeof LatestBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockProjectsShortened[0]
};

const MultipleBoxes = () => {
  return mockProjectsShortened.map(p => <LatestBox {...p} />);
};
export const Multiple: Story = {
  args: mockProjectsShortened[0],
  render: MultipleBoxes
};
