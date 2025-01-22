import type { Meta, StoryObj } from "@storybook/react";

import { ResultListRenderer } from "./ResultListRenderer";
import { mockArticlesFound } from "@/types/mocks";

const meta = {
  title: "Widgets/ArticlesGlobalSearch/ResultListRenderer",
  component: ResultListRenderer,
  args: {}
} satisfies Meta<typeof ResultListRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    list: mockArticlesFound,
    searchedPhrase: "interdum ipsum"
  }
};
