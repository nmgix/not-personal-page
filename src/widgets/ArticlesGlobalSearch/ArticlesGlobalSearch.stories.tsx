import type { Args, Meta, StoryObj } from "@storybook/react";

import { ArticlesGlobalSearch, SearchRef } from "@/widgets/ArticlesGlobalSearch";
import { useRef } from "react";

const meta = {
  title: "Widgets/ArticlesGlobalSearch",
  component: ArticlesGlobalSearch,
  args: {}
} satisfies Meta<typeof ArticlesGlobalSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const TutorialWrapper = () => {
  const ref = useRef<SearchRef>(null);

  return (
    <>
      <span style={{ color: "white" }}>
        press <kbd>ctrl + k</kbd>
      </span>
      <button onClick={() => ref.current?.setModalState(true)}>or open</button>
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          backgroundColor: "coral",
          left: "50vw",
          top: "50vh",
          transform: "transalte(-50%, -50%)",
          opacity: 0.3
        }}>
        some div for modal trasparency example
      </div>
      <ArticlesGlobalSearch ref={ref} />
    </>
  );
};

export const Default: Story = {
  render: TutorialWrapper
};
