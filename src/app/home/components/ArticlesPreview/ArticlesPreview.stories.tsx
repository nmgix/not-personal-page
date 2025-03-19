import type { Meta, StoryObj } from "@storybook/react";

import { mockArticlesFound } from "@/types/mocks";
import { ArticlesPreview } from "./ArticlesPreview";

const meta = {
  title: "Pages/Home/ArticlesPreview",
  component: ArticlesPreview,
  args: {}
} satisfies Meta<typeof ArticlesPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    list: mockArticlesFound
  }
};

export const Empty: Story = {
  args: {
    list: []
  }
};
