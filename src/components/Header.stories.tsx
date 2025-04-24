import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Header } from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 336, background: "#fff", padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isLoggedIn: false,
    onClose: action("onClose"),
    onLogout: action("onLogout"),
  },
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 336, background: "#fff", padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isLoggedIn: true,
    onClose: action("onClose"),
    onLogout: action("onLogout"),
  },
};
