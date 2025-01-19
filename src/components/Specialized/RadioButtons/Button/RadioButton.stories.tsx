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
    children: (
      <>
        <Icon icon='arrow-link' />
        <span>Button example</span>
      </>
    ),
    name: "example-name"
  }
};
