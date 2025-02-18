import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/Generic/Input";

const meta = {
  title: "Generic/Input",
  component: Input,
  args: {}
} satisfies Meta<typeof Input>;

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
