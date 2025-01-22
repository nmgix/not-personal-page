import type { Args, Meta, StoryObj } from "@storybook/react";

import { ModelViewer } from "@/components/Specialized/ModelViewer";

const meta = {
  title: "Specialized/ModelViewer",
  component: ModelViewer,
  args: {}
} satisfies Meta<typeof ModelViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

const StoryWrapper = (args: Args) => {
  return (
    <div style={{ width: "100%", height: "70vh" }}>
      <ModelViewer renderModelTitle={args.renderModelTitle} />
    </div>
  );
};

export const Default: Story = {
  args: {
    renderModelTitle: "dragons_liberation"
  },
  render: StoryWrapper
};
