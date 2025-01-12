import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "@/components/Generic/Modal";
// import icons from "../../public/icons.svg";

const meta = {
  title: "Generic/Modal",
  component: Modal,
  args: {}
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Пример модалки</div>,
    closeModal: () => console.log("close modal"),
    label: "modal label",
    show: true
  }
};
