import type { Meta, StoryObj } from "@storybook/react";

import { VideoPreview } from "@/components/Specialized/VideoPreview";
import { mockArticlesFound } from "@/types/mocks";

const meta = {
  title: "Specialized/VideoPreview",
  component: VideoPreview,
  args: {}
} satisfies Meta<typeof VideoPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    meta: mockArticlesFound[0],
    slug: "/blog/memes-21",
    videoPreview: {
      videoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56/horizontal/previews/videvo_watermarked/large.mp4",
      imagePlaceholderSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
      relatedTagsIcons: ["code", "video", "blog"]
    }
  }
};

export const VideoError: Story = {
  args: {
    meta: mockArticlesFound[1],
    slug: "/blog/memes-21",
    videoPreview: {
      videoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56.mp4",
      imagePlaceholderSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
      relatedTagsIcons: ["code", "video", "blog"]
    }
  }
};

export const ImageAndVideoErrors: Story = {
  args: {
    // id: "bb91d6b3-930d-4feb-9051-a67f5bc14558",
    // title: "some project demo long title",
    // shortenedDescription:
    //   "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
    // shortenedVideoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56.mp4",
    // // blob:https://vk.com/533c505c-4dba-4079-976b-7d1c50cd5a01
    // videoLength: 15,
    // thumbnailSrc: "https://avatars.mds.yandex.net/i?id=38626a0f2bfc_l-5334983-images-thumbs&n=13",
    // href: "/blog/memes-21",
    // relatedTags: ["code", "video", "blog"]
    meta: mockArticlesFound[2],
    slug: "/blog/memes-22",
    videoPreview: {
      videoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56.mp4",
      imagePlaceholderSrc: "https://avatars.mds.yandex.net/i?id=38626a0f2bfc_l-5334983-images-thumbs&n=13",
      relatedTagsIcons: ["code", "video", "blog"]
    }
  }
};
