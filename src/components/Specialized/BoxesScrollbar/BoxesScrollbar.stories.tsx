import type { Meta, StoryObj } from "@storybook/react";

import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import { Icon } from "@/components/Generic/Icon";

const meta = {
  title: "Specialized/BoxesScrollbar",
  component: BoxesScrollbar,
  args: {}
} satisfies Meta<typeof BoxesScrollbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    list: [
      <>
        <Icon icon='blog' />
        <span>приключение</span>
      </>,
      <>
        <Icon icon='video' />
        <span>jump demo</span>
      </>,
      <>
        <Icon icon='tech-article' />
        <span>libuv в node.js</span>
      </>,

      <>
        <Icon icon='blog' />
        <span>приключение</span>
      </>,
      <>
        <Icon icon='video' />
        <span>jump demo</span>
      </>,
      <>
        <Icon icon='tech-article' />
        <span>libuv в node.js</span>
      </>,
      <>
        <Icon icon='blog' />
        <span>приключение</span>
      </>,
      <>
        <Icon icon='video' />
        <span>jump demo</span>
      </>,
      <>
        <Icon icon='tech-article' />
        <span>libuv в node.js</span>
      </>
    ]
  }
};
