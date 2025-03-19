import type { Meta, StoryObj } from "@storybook/react";
import { LatestNewsTabs } from "./LatestNewsTabs";

const meta = {
  title: "Pages/Home/LatestNewsTabs",
  component: LatestNewsTabs,
  args: {}
} satisfies Meta<typeof LatestNewsTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
