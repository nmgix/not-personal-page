import type { Meta, StoryObj } from "@storybook/react";

import { VideosPreview } from "@/widgets/VideosPreview";
import { mockArticlesFound } from "@/types/mocks";

const meta = {
  title: "Widgets/VideosPreview",
  component: VideosPreview,
  args: {}
} satisfies Meta<typeof VideosPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    videos: [
      {
        title: "some project demo long title",
        shortenedDescription:
          "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
        shortenedVideoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56/horizontal/previews/videvo_watermarked/large.mp4",

        videoLength: 15,
        thumbnailSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
        href: "/blog/memes-21",
        relatedTags: ["code", "video", "blog"]
      },
      {
        title: "some project demo long title",
        shortenedDescription:
          "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
        shortenedVideoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56/horizontal/previews/videvo_watermarked/large.mp4",

        videoLength: 15,
        thumbnailSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
        href: "/blog/memes-21",
        relatedTags: ["code", "video", "blog"]
      },
      {
        title: "some project demo long title",
        shortenedDescription:
          "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
        shortenedVideoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56/horizontal/previews/videvo_watermarked/large.mp4",

        videoLength: 15,
        thumbnailSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
        href: "/blog/memes-21",
        relatedTags: ["code", "video", "blog"]
      },
      {
        title: "some project demo long title",
        shortenedDescription:
          "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
        shortenedVideoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9ews/videvo_watermarked/large.mp4",

        videoLength: 15,
        thumbnailSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
        href: "/blog/memes-21",
        relatedTags: ["code", "video", "blog"]
      },
      {
        title: "some project demo long title",
        shortenedDescription:
          "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
        shortenedVideoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56/horizontal/previews/videvo_watermarked/large.mp4",

        videoLength: 15,
        thumbnailSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
        href: "/blog/memes-21",
        relatedTags: ["code", "video", "blog"]
      },
      {
        title: "some project demo long title",
        shortenedDescription:
          "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
        shortenedVideoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56/horizontal/previews/videvo_watermarked/large.mp4",

        videoLength: 15,
        thumbnailSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
        href: "/blog/memes-21",
        relatedTags: ["code", "video", "blog"]
      }
    ]
  }
};

export const Empty: Story = {
  args: {
    videos: []
  }
};
