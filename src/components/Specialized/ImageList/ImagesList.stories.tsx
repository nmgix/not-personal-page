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
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4" }
    ],
    size: { width: 70, height: 70 },
    galleryButton: false
  }
};

export const OneImage: Story = {
  args: {
    images: [{ src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" }],
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
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg", alt: "meme 5" }
    ],
    size: { width: 70, height: 70 },
    imageThreshold: 5,
    galleryButton: false
  }
};

export const FourImagesGalleryDefaultLimit: Story = {
  args: {
    images: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4" }
    ],
    size: { width: 70, height: 70 },
    galleryButton: true
  }
};

// export const MemesNoPreview: Story = {
//   args: {
//     id: "a7c30da6-c452-480a-9ae1-038ee5b564e5",
//     imagesSrc: [
//       "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg",
// "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg",
// "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png",
// "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg",
// "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg"
//     ],
//     previewImages: false,
//     src: "/blog/memes_daily_121",
//     tags: ["memes", "daily"],
//     textPreview:
//       "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
//     title: "Daily memes 121",
//     TTRmins: 3
//   }
// };
// export const MemesPreview: Story = {
//   args: {
//     id: "10ac14f9-5457-4330-b2a0-87080de3bab7",
//     imagesSrc: [
//       "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg",
//       "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg",
//       "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png",
//       "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg",
//       "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg"
//     ],
//     previewImages: true,
//     src: "/blog/memes_daily_122",
//     tags: ["memes", "daily"],
//     textPreview:
//       "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
//     title: "Daily memes 122",
//     TTRmins: 0.5
//   }
// };
// export const MemesNoDescription: Story = {
//   args: {
//     id: "f9301849-bdd2-49b7-b8d4-52a5327540f4",
//     imagesSrc: [
//       "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg",
//       "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg",
//       "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png",
//       "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg",
//       "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg"
//     ],
//     previewImages: true,
//     src: "/blog/memes_daily_123",
//     tags: ["memes", "daily"],
//     title: "Daily memes 123",
//     TTRmins: 1
//   }
// };
// export const MemesNoImages: Story = {
//   args: {
//     id: "79ed9bfd-a32f-4b63-beab-eda0c5aef0cb",
//     src: "/blog/memes_daily_124",
//     tags: ["memes", "daily"],
//     textPreview:
//       "Duis eget condimentum neque. In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus. Vivamus porttitor, ex eget luctus posuere, elit neque placerat ante, eu sagittis arcu velit ut neque",
//     title: "Daily memes 124",
//     TTRmins: 14
//   }
// };
// export const MemesNoInfo: Story = {
//   args: {
//     id: "a42c8be6-4a7d-4cda-9faf-cb33cd39741d",
//     src: "/blog/memes_daily_125",
//     tags: [],
//     title: "Daily memes 125",
//     TTRmins: 105
//   }
// };
