import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "@/components/Generic/Icon";
// import icons from "../../public/icons.svg";

const meta = {
  title: "Generic/Icon",
  component: Icon,
  args: {}
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "arrow-link",
    color: "red"
  }
};
