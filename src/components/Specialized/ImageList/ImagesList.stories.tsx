import type { Meta, StoryObj } from "@storybook/react";

import { ImageList } from "@/components/Specialized/ImageList";

const meta = {
  title: "Specialized/ImageList",
  component: ImageList,
  args: {}
} satisfies Meta<typeof ImageList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourImagesDefaultLimit: Story = {
  args: {
    images: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1", id: "1520f129-c938-48ef-bff2-84a27e03c797" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2", id: "8317845a-feeb-415e-bb08-1648da2f5391" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3", id: "02e010f0-3bc5-4bab-94d2-71055aaffb76" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4", id: "1aa65a6b-5d7e-43c4-bd0d-78cb7b214b89" }
    ],
    size: { width: 70, height: 70 },
    galleryButton: false
  }
};

export const OneImage: Story = {
  args: {
    images: [{ src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1", id: "f59db00e-41f9-45d6-b70a-09b9550cd291" }],
    size: { width: 70, height: 70 },
    galleryButton: false
  }
};

export const NoImages: Story = {
  args: {
    images: [],
    size: { width: 70, height: 70 },
    galleryButton: false
  }
};

export const FiveImagesIncreasedLimit: Story = {
  args: {
    images: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1", id: "46f7ae1c-5bd3-4d24-ac8c-14881dd19aa3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2", id: "7d3e7e13-31d2-4246-b6fc-b459b30b59ad" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3", id: "7834b6ad-45be-4fa4-99eb-490230a76df1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4", id: "cac8d055-2528-4442-949a-703fdb237426" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg", alt: "meme 5", id: "8317845a-feeb-415e-bb08-1648da2f5391" }
    ],
    size: { width: 70, height: 70 },
    imageThreshold: 5,
    galleryButton: false
  }
};

export const FourImagesGalleryDefaultLimit: Story = {
  args: {
    images: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1", id: "1aa65a6b-5d7e-43c4-bd0d-78cb7b214b89" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2", id: "46f7ae1c-5bd3-4d24-ac8c-14881dd19aa3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3", id: "f59db00e-41f9-45d6-b70a-09b9550cd291" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4", id: "7834b6ad-45be-4fa4-99eb-490230a76df1" }
    ],
    size: { width: 70, height: 70 },
    galleryButton: true
  }
};
