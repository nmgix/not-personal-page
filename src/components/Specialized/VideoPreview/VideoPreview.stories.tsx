import type { Meta, StoryObj } from "@storybook/react";

import { VideoPreview } from "@/components/Specialized/VideoPreview";
import { mockProjectsShortened } from "@/types/mocks";

const meta = {
  title: "Specialized/VideoPreview",
  component: VideoPreview,
  args: {}
} satisfies Meta<typeof VideoPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    meta: mockProjectsShortened[0]["meta"],
    slug: "/blog/memes-21"
  }
};

export const VideoError: Story = {
  args: {
    meta: { ...mockProjectsShortened[0]["meta"], videoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56.mp4" },
    slug: "/blog/memes-21"
  }
};

export const ImageAndVideoErrors: Story = {
  args: {
    meta: {
      ...mockProjectsShortened[0]["meta"],
      videoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56.mp4",
      imagePlaceholderSrc: "https://avatars.mds.yandex.net/i?id=38626a0f2bfc_l-5334983-images-thumbs&n=13"
    },
    slug: "/blog/memes-22"
  }
};
