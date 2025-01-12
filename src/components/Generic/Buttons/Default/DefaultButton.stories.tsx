import type { Meta, StoryObj } from "@storybook/react";

import { DefaultButton } from "@/components/Generic/Buttons";
import { Icon } from "@/components/Generic/Icon";
// import icons from "../../public/icons.svg";

const meta = {
  title: "Generic/Buttons/DefaultButton",
  component: DefaultButton,
  args: {}
} satisfies Meta<typeof DefaultButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Ok</span>,
    onClick: () => console.log("ok")
  }
};

export const IconButton: Story = {
  args: {
    children: (
      <Icon icon='filter' />
      // <svg style={{ color: "gray" }}>
      //   <use xlinkHref={`${icons}#filter`}></use>
      // </svg>
    ),
    onClick: () => console.log("create filter popup")
  }
};
