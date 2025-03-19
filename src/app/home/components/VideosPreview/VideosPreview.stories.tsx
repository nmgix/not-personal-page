import type { Meta, StoryObj } from "@storybook/react";

import { mockProjectsShortened } from "@/types/mocks";
import { VideosPreview } from "./VideosPreview";

const meta = {
  title: "Pages/Home/VideosPreview",
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
