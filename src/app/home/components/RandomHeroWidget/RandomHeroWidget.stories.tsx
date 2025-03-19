import type { Meta, StoryObj } from "@storybook/react";
import { RandomHeroWidget } from "./RandomHeroWidget";

const meta = {
  title: "Pages/Home/RandomHeroWidget",
  component: RandomHeroWidget,
  args: {}
} satisfies Meta<typeof RandomHeroWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
