import type { Meta, StoryObj } from "@storybook/react";

import { VideosPreview } from "@/widgets/VideosPreview";
import { mockProjectsShortened } from "@/types/mocks";

const meta = {
  title: "Widgets/VideosPreview",
  component: VideosPreview,
  args: {}
} satisfies Meta<typeof VideosPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    videos: mockProjectsShortened
  }
};

export const Empty: Story = {
  args: {
    videos: []
  }
};
