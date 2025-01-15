import type { Meta, StoryObj } from "@storybook/react";

import { CookiePopup } from "@/widgets/CookiePopup";

const meta = {
  title: "Widgets/CookiePopup",
  component: CookiePopup,
  args: {}
} satisfies Meta<typeof CookiePopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
