import type { Args, Meta, StoryObj } from "@storybook/react";

import { ArticlesGlobalSearch } from "@/widgets/ArticlesGlobalSearch";

const meta = {
  title: "Widgets/ArticlesGlobalSearch",
  component: ArticlesGlobalSearch,
  args: {}
} satisfies Meta<typeof ArticlesGlobalSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const TutorialWrapper = () => {
  return (
    <>
      <span style={{ color: "white" }}>
        press <kbd>ctrl + k</kbd>
      </span>
      <ArticlesGlobalSearch />
    </>
  );
};

export const Default: Story = {
  render: TutorialWrapper
};
