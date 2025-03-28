import type { Meta, StoryObj } from "@storybook/react";

import { RadioButton } from "@/components/Specialized/RadioButtons";
import { Icon } from "@/components/Generic/Icon";

const meta = {
  title: "Specialized/RadioButtons/Button",
  component: RadioButton,
  args: {}
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    idx: 0,
    checked: false,
    onSelect: id => console.log(id),
    value: "idk",
    children: (
      <>
        <Icon icon='arrow-link' />
        <span>Button example</span>
      </>
    ),
    name: "example-name"
  }
};
