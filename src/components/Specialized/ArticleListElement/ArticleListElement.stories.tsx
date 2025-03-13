import type { Meta, StoryObj } from "@storybook/react";

import { ArticleListElement } from "@/components/Specialized/ArticleListElement";

const meta = {
  title: "Specialized/ArticleListElement",
  component: ArticleListElement,
  args: {}
} satisfies Meta<typeof ArticleListElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MemesNoPreview: Story = {
  args: {
    slug: "blog/memes_daily_121",
    // id: "a7c30da6-c452-480a-9ae1-038ee5b564e5",
    imagesSrc: [
      {
        // id: "5c5436e8-2c76-4e22-bad1-5ee4ff9c0e76",
        alt: "meme 1",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg"
      },
      {
        // id: "fb2a008c-4609-46c8-af4f-cc6e0c27a4b2",
        alt: "meme 2",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg"
      },
      {
        // id: "992ece65-2e15-4889-822e-78f29c59f35e",
        alt: "meme 3",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png"
      },
      {
        // id: "337f6af5-41f5-4494-96c7-af2e9d495c89",
        alt: "meme 4",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg"
      },
      {
        // id: "0543b74b-9c41-454f-a1ee-5ecf4f01b5f2",
        alt: "meme 5",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg"
      }
    ],
    previewImages: false,
    // href: "/blog/memes_daily_121",
    tags: ["memes", "daily"],
    textPreview:
      "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 121",
    TTRmins: 3,
    categoryImg: "blog"
  }
};
export const MemesPreview: Story = {
  args: {
    slug: "blog/memes_daily_122",
    // id: "10ac14f9-5457-4330-b2a0-87080de3bab7",
    imagesSrc: [
      {
        // id: "5c5436e8-2c76-4e22-bad1-5ee4ff9c0e76",
        alt: "meme 1",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg"
      },
      {
        // id: "fb2a008c-4609-46c8-af4f-cc6e0c27a4b2",
        alt: "meme 2",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg"
      },
      {
        // id: "992ece65-2e15-4889-822e-78f29c59f35e",
        alt: "meme 3",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png"
      },
      {
        // id: "337f6af5-41f5-4494-96c7-af2e9d495c89",
        alt: "meme 4",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg"
      },
      {
        // id: "0543b74b-9c41-454f-a1ee-5ecf4f01b5f2",
        alt: "meme 5",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg"
      }
    ],
    previewImages: true,
    // href: "/blog/memes_daily_122",
    tags: ["memes", "daily"],
    textPreview:
      "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 122",
    TTRmins: 0.5,
    categoryImg: "blog"
  }
};
export const MemesNoDescription: Story = {
  args: {
    slug: "blog/memes_daily_123",
    // id: "f9301849-bdd2-49b7-b8d4-52a5327540f4",
    imagesSrc: [
      {
        // id: "5c5436e8-2c76-4e22-bad1-5ee4ff9c0e76",
        alt: "meme 1",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg"
      },
      {
        // id: "fb2a008c-4609-46c8-af4f-cc6e0c27a4b2",
        alt: "meme 2",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg"
      },
      {
        // id: "992ece65-2e15-4889-822e-78f29c59f35e",
        alt: "meme 3",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png"
      },
      {
        // id: "337f6af5-41f5-4494-96c7-af2e9d495c89",
        alt: "meme 4",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg"
      },
      {
        // id: "0543b74b-9c41-454f-a1ee-5ecf4f01b5f2",
        alt: "meme 5",
        src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg"
      }
    ],
    previewImages: true,
    // href: "/blog/memes_daily_123",
    tags: ["memes", "daily"],
    title: "Daily memes 123",
    TTRmins: 1,
    categoryImg: "blog"
  }
};
export const MemesNoImages: Story = {
  args: {
    // id: "79ed9bfd-a32f-4b63-beab-eda0c5aef0cb",
    // href: "/blog/memes_daily_124",
    slug: "blog/memes_daily_124",
    tags: ["memes", "daily"],
    textPreview:
      "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
    title: "Daily memes 124",
    TTRmins: 14,
    categoryImg: "blog"
  }
};
export const TechArticleNoInfo: Story = {
  args: {
    // id: "a42c8be6-4a7d-4cda-9faf-cb33cd39741d",
    // href: "/tech-article/cpp-example-23-01-2024",
    slug: "note/cpp-example-23-01-2024",
    tags: [],
    title: "C++ example",
    TTRmins: 60,
    categoryImg: "tech-article"
  }
};
