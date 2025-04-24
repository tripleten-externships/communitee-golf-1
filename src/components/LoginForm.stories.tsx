import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { LoginForm } from "./LoginForm";

const meta = {
  title: "Components/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLogin: action("onLogin"),
    onClose: action("onClose"),
    onForgotPassword: action("onForgotPassword"),
  },
};
