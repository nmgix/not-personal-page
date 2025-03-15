import { ImageElement } from "@/components/Specialized/ImageList";
import { ArticleListElementProps, ArticleVideoPreview, TArticleDefault } from "./articles";

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
    // id: "10ac14f9-5457-4330-b2a0-87080de3bab7",
    imagesSrc: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg", alt: "meme 5" }
    ],
    previewImages: true,
    // href: "/blog/memes_daily_122",
    slug: "blog/memes_daily_122",
    tags: ["memes", "daily"],
    textPreview:
      "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 122",
    TTRmins: 0.5,
    categoryImg: "blog",
    date: "2024-05-12 13:00:50"
  },
  {
    // id: "f9301849-bdd2-49b7-b8d4-52a5327540f4",
    imagesSrc: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3" }
    ],
    previewImages: true,
    // href: "/blog/memes_daily_123",
    slug: "blog/memes_daily_123",
    tags: ["memes", "daily"],
    textPreview:
      "In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 123",
    TTRmins: 1,
    categoryImg: "tech-article",
    date: "2022-05-12 13:00:50"
  },
  {
    // id: "79ed9bfd-a32f-4b63-beab-eda0c5aef0cb",
    // href: "/blog/memes_daily_124",
    slug: "/blog/memes_daily_124",
    tags: ["memes", "daily"],
    textPreview:
      "Interdum ipsum sit amet, cursus quam. Interdum ipsum cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 124",
    TTRmins: 14,
    categoryImg: "video",
    date: "2023-05-12 13:00:50"
  },
  {
    // id: "6dca1e1a-a6fb-4281-9d4b-648eeec9f876",
    // href: "/blog/memes_daily_125",
    slug: "blog/memes_daily_125",
    tags: ["memes", "daily"],
    textPreview:
      "Interdum ipsum sit amet, cursus quam. Interdum ipsum cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 125",
    TTRmins: 10,
    categoryImg: "video",
    date: "2021-05-12 13:00:50"
  }
];

export const mockProjectsShortened: ArticleVideoPreview[] = Array(5).fill({
  meta: {
    title: "some project demo long title",
    textPreview: "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
    videoSrc: "https://videocdn.cdnpk.net/videos/cc934814-aaec-423f-85c8-8b9f5b125d56/horizontal/previews/videvo_watermarked/large.mp4",

    imagePlaceholderSrc: "https://avatars.mds.yandex.net/i?id=38626a0a842450fb09a1de88d86f2bfc_l-5334983-images-thumbs&n=13",
    tags: ["code", "video", "blog"],
    categoryImg: "blog",
    TTRmins: 5,
    date: "2023-03-01 16:50:01"
  },
  slug: "project/memes-21"
});

export const mockServerArticleFetch = async (id: string) => {
  // console.log(id);
  const apiArticle: TArticleDefault & { slug: string; text: string } = {
    // id: "ec957c53-8081-440b-b441-461357222144",
    // href: "/blog/some-ideas",
    categoryImg: "blog",
    tags: ["ideas", "news", "new", "gamedev"],
    date: "2023-03-01 16:50:01",
    // text: "тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст.",
    text: [
      "тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как",
      "изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз",
      "как разделять на отдельные части, как изображения вставлять, md parcer в помощь.",
      "Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст.",
      "изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз",
      "как разделять на отдельные части, как изображения вставлять, md parcer в помощь."
    ].join(" "),
    title: id ?? "Некоторые идеи",
    TTRmins: 5,
    textPreview: "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
    imagesSrc: mockImages,
    slug: "blog/some-news-123"
  };
  return apiArticle;
};

import { Icon } from "@/components/Generic/Icon";

export const mockList = [
  <>
    <Icon icon='blog' />
    <span>приключение</span>
  </>,
  <>
    <Icon icon='video' />
    <span>jump demo</span>
  </>,
  <>
    <Icon icon='tech-article' />
    <span>libuv в node.js</span>
  </>,

  <>
    <Icon icon='blog' />
    <span>приключение</span>
  </>,
  <>
    <Icon icon='video' />
    <span>jump demo</span>
  </>,
  <>
    <Icon icon='tech-article' />
    <span>libuv в node.js</span>
  </>,
  <>
    <Icon icon='blog' />
    <span>приключение</span>
  </>,
  <>
    <Icon icon='video' />
    <span>jump demo</span>
  </>,
  <>
    <Icon icon='tech-article' />
    <span>libuv в node.js</span>
  </>
];
