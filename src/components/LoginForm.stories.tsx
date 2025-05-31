import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import { AuthProvider } from "../contexts/AuthContext";

const meta = {
  title: "Components/LoginForm",
  component: LoginForm,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
