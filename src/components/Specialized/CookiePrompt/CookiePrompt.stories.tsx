import type { Meta, StoryObj } from "@storybook/react";

import { CookiePrompt } from "@/components/Specialized/CookiePrompt";
// import icons from "../../public/icons.svg";

const meta = {
  title: "Specialized/CookiePrompt",
  component: CookiePrompt,
  args: {}
} satisfies Meta<typeof CookiePrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
