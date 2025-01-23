import type { Meta, StoryObj } from "@storybook/react";
import { RandomHeroWidget } from "@/widgets/RandomHeroWidget";

const meta = {
  title: "Widgets/RandomHeroWidget",
  component: RandomHeroWidget,
  args: {}
  // decorators: [
  //   Story => (
  //     <Html>
  //       {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
  //       <Story />
  //     </Html>
  //   )
  // ]
} satisfies Meta<typeof RandomHeroWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
