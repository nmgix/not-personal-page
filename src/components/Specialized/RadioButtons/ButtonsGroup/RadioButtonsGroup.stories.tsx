import type { Meta, StoryObj } from "@storybook/react";

import { RadioButtonsGroup } from "@/components/Specialized/RadioButtons";
import { Icon } from "@/components/Generic/Icon";

const meta = {
  title: "Specialized/RadioButtons/ButtonsGroup",
  component: RadioButtonsGroup,
  args: {}
} satisfies Meta<typeof RadioButtonsGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Icons",
    options: [
      <>
        <Icon icon='arrow-link' />
        <span>Button example</span>
      </>,
      <>
        <Icon icon='blog' />
        <span>Button example</span>
      </>,
      <>
        <Icon icon='drag-left' />
        <span>Button example</span>
      </>
    ]
  }
};

export const EmptyOptions: Story = {
  args: { options: [], name: "Example-name" }
};

export const EmptyName: Story = {
  args: {
    name: "",
    options: [
      <>
        <Icon icon='arrow-link' />
        <span>Button example</span>
      </>,
      <>
        <Icon icon='blog' />
        <span>Button example</span>
      </>,
      <>
        <Icon icon='drag-left' />
        <span>Button example</span>
      </>
    ]
  }
};
