import type { Meta, StoryObj } from "@storybook/react";
import DMView, { ThreadMsg, Message } from "./DMView";

const meta = {
  title: "Components/DMView",
  component: DMView,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DMView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // DMView only needs id, username and picture for the header
    message: {
      messageid: "1",
      username: "Manager",
      picture: "https://via.placeholder.com/36",
    } as Message,

    // thread stays the same
    thread: [
      {
        id: "t1",
        content: "Hello, I’d like to book a tee time.",
        sentAt: new Date().toISOString(),
        senderId: "client",
      } as ThreadMsg,
      {
        id: "t2",
        content: "Sure, what date works for you?",
        sentAt: new Date().toISOString(),
        senderId: "manager",
      } as ThreadMsg,
    ],

    onBack: () => console.log("Back clicked"),
    onSend: async (content: string) => console.log("Send:", content),
  },
};
