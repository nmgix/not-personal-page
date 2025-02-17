import type { Meta, StoryObj } from "@storybook/react";

import { ArticlesPreview } from "@/widgets/ArticlesPreview";
import { mockArticlesFound } from "@/types/mocks";

const meta = {
  title: "Widgets/ArticlesPreview",
  component: ArticlesPreview,
  args: {}
} satisfies Meta<typeof ArticlesPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    list: mockArticlesFound,
    articlesHref: "/articles/"
  }
};

export const Empty: Story = {
  args: {
    list: [],
    articlesHref: "/articles/"
  }
};
