import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/Generic/Input";
import { useRef } from "react";

const InputRefWrapper = (args: Omit<React.ComponentProps<typeof Input>, "ref">) => {
  const ref = useRef(null);

  return <Input ref={ref} {...args} />;
};

const meta = {
  title: "Generic/Input",
  component: InputRefWrapper,
  args: {}
} satisfies Meta<typeof InputRefWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const wordsArr = ["мультисемплинг", "геймдев", "разработка"];

export const Default: Story = {
  args: {
    label: "Пример инпута ^",
    placeholder: wordsArr.map(w => `например, ${w}`),
    name: "input name for form",
    onEnterPress: s => console.log("After enter pressed: " + s),
    onLetterEntered: s => console.log("After letter entered: " + s),
    onTextInputDebounce: s => console.log("After text input debounce: " + s)
  }
};
