import { ImageElement } from "@/components/Specialized/ImageList";
import { ArticleListElementProps } from "./articles";
import { VideoPreviewProps } from "@/components/Specialized/VideoPreview";

export const mockTags: { type: string; title: string }[] = [
  { type: "gamedev", title: "#gamedev" },
  { type: "thoughts", title: "#thoughts" },
  { type: "c++", title: "#c++" }
];
export const mockArticlesAmount = 163;

export const mockImages: ImageElement[] = [
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" },
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2" },
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3" },
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4" },
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg", alt: "meme 5" }
];

export const mockArticlesFound: ArticleListElementProps[] = [
  {
    id: "10ac14f9-5457-4330-b2a0-87080de3bab7",
    imagesSrc: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg", alt: "meme 5" }
    ],
    previewImages: true,
    href: "/blog/memes_daily_122",
    tags: ["memes", "daily"],
    textPreview:
      "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 122",
    TTRmins: 0.5,
    categoryImg: "blog"
  },
  {
    id: "f9301849-bdd2-49b7-b8d4-52a5327540f4",
    imagesSrc: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3" }
    ],
    previewImages: true,
    href: "/blog/memes_daily_123",
    tags: ["memes", "daily"],
    textPreview:
      "In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 123",
    TTRmins: 1,
    categoryImg: "tech-article"
  },
  {
    id: "79ed9bfd-a32f-4b63-beab-eda0c5aef0cb",
    href: "/blog/memes_daily_124",
    tags: ["memes", "daily"],
    textPreview:
      "Interdum ipsum sit amet, cursus quam. Interdum ipsum cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 124",
    TTRmins: 14,
    categoryImg: "video"
  },
  {
    id: "6dca1e1a-a6fb-4281-9d4b-648eeec9f876",
    href: "/blog/memes_daily_125",
    tags: ["memes", "daily"],
    textPreview:
      "Interdum ipsum sit amet, cursus quam. Interdum ipsum cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 125",
    TTRmins: 10,
    categoryImg: "video"
  }
];

export const mockProjectsShortened: VideoPreviewProps[] = [
  {
    id: "cc74cc3d-1551-4c24-a115-08fd20c2b354",
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
    id: "54fc8899-ebf8-4eec-888f-a6912eae9902",
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
    id: "f2b83eb3-ff73-4e70-9700-5569ec0e0959",
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
    id: "6c71dd05-e2d5-490b-a749-ad2869a50e9a",
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
    id: "614f5402-6775-4f5b-b6bf-6da907bd73a1",
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
    id: "e6e7da17-bfbf-411c-903e-08d7f65a376b",
    title: "some project demo long title",
    shortenedDescription:
      "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
    shortenedVideoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56/horizontal/previews/videvo_watermarked/large.mp4",

    videoLength: 15,
    thumbnailSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
    href: "/blog/memes-21",
    relatedTags: ["code", "video", "blog"]
  }
];
