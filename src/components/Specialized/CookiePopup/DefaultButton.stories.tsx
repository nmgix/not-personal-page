import type { Meta, StoryObj } from "@storybook/react";

import { CookiePopup } from "@/components/Specialized/CookiePopup";
// import icons from "../../public/icons.svg";

const meta = {
  title: "Specialized/CookiePopup",
  component: CookiePopup,
  args: {}
} satisfies Meta<typeof CookiePopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
