import type { Meta, StoryObj } from "@storybook/react";

const Box = (args?: { styles: React.CSSProperties }) => {
  return <div className='box' style={args ? args.styles : { width: "100px", height: "50px" }} />;
};

const meta = {
  title: "Generic/Box",
  component: Box,
  args: {}
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    styles: { width: "150px", height: "75px" }
  }
};

export const SmallBox: Story = {
  args: {
    styles: { width: "50px", height: "15px" }
  }
};
