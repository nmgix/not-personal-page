import type { Meta, StoryObj } from "@storybook/react";

import { ImageList } from "@/components/Specialized/ImageList";
import { mockImages } from "@/types/mocks";

const meta = {
  title: "Specialized/ImageList",
  component: ImageList,
  args: {}
} satisfies Meta<typeof ImageList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourImagesDefaultLimit: Story = {
  args: {
    images: mockImages.slice(0, 5),
    size: { width: 70, height: 70 },
    galleryButton: false
  }
};

export const OneImage: Story = {
  args: {
    images: mockImages.slice(0, 1),
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
    images: mockImages,
    size: { width: 70, height: 70 },
    imageThreshold: 5,
    galleryButton: false
  }
};

export const FourImagesGalleryDefaultLimit: Story = {
  args: {
    images: mockImages.slice(0, 5),
    size: { width: 70, height: 70 },
    galleryButton: true
  }
};
