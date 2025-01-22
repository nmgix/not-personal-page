import type { Args, Meta, StoryObj } from "@storybook/react";

import { ErrorBoundary } from "@/components/Specialized/ErrorBoundary";
import { useState } from "react";
import { Icon } from "@/components/Generic/Icon";

const meta = {
  title: "Specialized/ErrorBoundary",
  component: ErrorBoundary,
  args: {}
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleErrorComponent = () => {
  const [state, setState] = useState(false);

  const breakComponent = () => {
    setState(true);
  };
  return !state ? (
    <div>
      component :)
      <button onClick={breakComponent}>break component</button>
    </div>
  ) : (
    Icon
  );
};

export const Default: Story = {
  args: {
    // @ts-expect-error for story purposes
    children: <ExampleErrorComponent />,
    fallbackComponent: <div style={{ color: "white" }}>UwU something is broken</div>
  }
};
