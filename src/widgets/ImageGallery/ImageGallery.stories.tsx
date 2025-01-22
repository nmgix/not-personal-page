import type { Meta, StoryObj } from "@storybook/react";

import { GalleryRef, ImageGallery } from "@/widgets/ImageGallery";
import { useRef } from "react";

const StoryWrapper = (args: Omit<React.ComponentProps<typeof ImageGallery>, "ref">) => {
  const galleryRef = useRef<GalleryRef>(null);

  return (
    <div>
      <button onClick={() => galleryRef.current?.setModalOpen(true)}>open gallery</button>
      <ImageGallery ref={galleryRef} {...args} />
    </div>
  );
};

const meta = {
  title: "Widgets/ImageGallery",
  component: StoryWrapper,
  args: {}
} satisfies Meta<typeof StoryWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: [
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290969647.jpg", alt: "meme 1", id: "46f7ae1c-5bd3-4d24-ac8c-14881dd19aa3" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290846680.jpeg", alt: "meme 2", id: "7d3e7e13-31d2-4246-b6fc-b459b30b59ad" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290857145.png", alt: "meme 3", id: "7834b6ad-45be-4fa4-99eb-490230a76df1" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736290938328.jpg", alt: "meme 4", id: "cac8d055-2528-4442-949a-703fdb237426" },
      { src: "https://cdn.memes.com/up/71558571535638926/i/1736237784651.jpg", alt: "meme 5", id: "8317845a-feeb-415e-bb08-1648da2f5391" }
    ],
    size: { width: 70, height: 70 }
  }
};
