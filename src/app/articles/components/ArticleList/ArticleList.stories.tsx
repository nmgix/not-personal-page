import type { Meta, StoryObj } from "@storybook/react";

import { ArticleList } from "@/app/articles/components/ArticleList";
import { mockArticlesFound } from "@/types/mocks";

const meta = {
  title: "Pages/Articles/ArticleList",
  component: ArticleList,
  args: {}
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    list: mockArticlesFound
  }
};
