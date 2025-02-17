import { ImageElement } from "@/components/Specialized/ImageList";
import { ArticleListElementProps } from "./articles";

export const mockImages: ImageElement[] = [
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1", id: "46f7ae1c-5bd3-4d24-ac8c-14881dd19aa3" },
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2", id: "7d3e7e13-31d2-4246-b6fc-b459b30b59ad" },
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3", id: "7834b6ad-45be-4fa4-99eb-490230a76df1" },
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4", id: "cac8d055-2528-4442-949a-703fdb237426" },
  { src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg", alt: "meme 5", id: "8317845a-feeb-415e-bb08-1648da2f5391" }
];

export const mockArticlesFound: ArticleListElementProps[] = [
  {
    id: "10ac14f9-5457-4330-b2a0-87080de3bab7",
    imagesSrc: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1", id: "46f7ae1c-5bd3-4d24-ac8c-14881dd19aa3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2", id: "7d3e7e13-31d2-4246-b6fc-b459b30b59ad" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3", id: "7834b6ad-45be-4fa4-99eb-490230a76df1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4", id: "cac8d055-2528-4442-949a-703fdb237426" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg", alt: "meme 5", id: "8317845a-feeb-415e-bb08-1648da2f5391" }
    ],
    previewImages: true,
    href: "/blog/memes_daily_122",
    tags: ["memes", "daily"],
    textPreview:
      "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 122",
    TTRmins: 0.5,
    category: "blog"
  },
  {
    id: "f9301849-bdd2-49b7-b8d4-52a5327540f4",
    imagesSrc: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1", id: "46f7ae1c-5bd3-4d24-ac8c-14881dd19aa3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2", id: "7d3e7e13-31d2-4246-b6fc-b459b30b59ad" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3", id: "7834b6ad-45be-4fa4-99eb-490230a76df1" }
    ],
    previewImages: true,
    href: "/blog/memes_daily_123",
    tags: ["memes", "daily"],
    textPreview:
      "In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 123",
    TTRmins: 1,
    category: "tech-article"
  },
  {
    id: "79ed9bfd-a32f-4b63-beab-eda0c5aef0cb",
    href: "/blog/memes_daily_124",
    tags: ["memes", "daily"],
    textPreview:
      "Interdum ipsum sit amet, cursus quam. Interdum ipsum cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 124",
    TTRmins: 14,
    category: "video"
  },
  {
    id: "6dca1e1a-a6fb-4281-9d4b-648eeec9f876",
    href: "/blog/memes_daily_125",
    tags: ["memes", "daily"],
    textPreview:
      "Interdum ipsum sit amet, cursus quam. Interdum ipsum cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 125",
    TTRmins: 10,
    category: "video"
  }
];
