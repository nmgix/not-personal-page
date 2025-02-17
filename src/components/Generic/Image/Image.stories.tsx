import type { Meta, StoryObj } from "@storybook/react";

import { Image } from "@/components/Generic/Image";
// import icons from "../../public/icons.svg";

const meta = {
  title: "Generic/Image",
  component: Image,
  args: {}
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://i.pinimg.com/originals/96/0c/41/960c411aebe71bac07b841fff8f02bc2.jpg",
    alt: "city image",
    size: {
      width: 300,
      height: 150
    },
    showAlt: true
  }
};

export const NotFound: Story = {
  args: {
    src: "https://i.pinimg.com/originals/9aebe71bac07b841fff8f02bc2.jpg",
    alt: "city image",
    size: {
      width: 300,
      height: 150
    },
    showAlt: true
  }
};
