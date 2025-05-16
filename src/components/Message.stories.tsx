import { StoryObj, Meta } from "@storybook/react";

import Message from "./Message"; // Adjust the import path based on your file structure

// More on default export: https://storybook.js.org/docs/writing-stories/introduction#default-export
const meta: Meta<typeof Message> = {
  title: "Components/Message", // Title for your component in the Storybook sidebar
  component: Message, // The component to document
  tags: ["autodocs"], // Automatically generated documentation
  argTypes: {
    message: { control: "text" }, // Control to edit the message text in Storybook
    isSent: { control: "boolean" }, // Control to toggle the isSent prop
  },
  // Optional: Add global decorators or parameters here
};

export default meta;

// More on writing stories: https://storybook.js.org/docs/writing-stories/introduction#using-args
type Story = StoryObj<typeof Message>;

// Existing Stories:

// Story for a Sent Message
export const Sent: Story = {
  args: {
    message: "This is a message I sent!",
    isSent: true,
  },
};

// Story for a Received Message
export const Received: Story = {
  args: {
    message: "This is a message I received.",
    isSent: false,
  },
};

// Optional: Add another story with a longer message
export const SentLong: Story = {
  args: {
    message:
      "This is a much longer message that I sent to test how the text wraps within the bubble.",
    isSent: true,
  },
};

export const ReceivedLong: Story = {
  args: {
    message:
      "This is a much longer message that I received to test how the text wraps within the bubble, including a reallylongwordthatmightcauseissues.",
    isSent: false,
  },
};

// New Stories for short messages:

// Story for a short word (e.g., "ok") - defaulting to sent
export const SentShortWord: Story = {
  args: {
    message: "k",
    isSent: true,
  },
};

// Story for a short word (e.g., "ok") - received case
export const ReceivedShortWord: Story = {
  args: {
    message: "ok",
    isSent: false,
  },
};

// Story for a small phrase (e.g., "i got it") - defaulting to sent
export const SentSmallPhrase: Story = {
  args: {
    message: "I got it",
    isSent: true,
  },
};

// Story for a small phrase (e.g., "i got it") - received case
export const ReceivedSmallPhrase: Story = {
  args: {
    message: "I've got it",
    isSent: false,
  },
};

// Message with newlines - sent
export const SentWithNewlines: Story = {
  args: {
    message: "First line\nSecond line\nThird line",
    isSent: true,
  },
};

// Message with newlines - received
export const ReceivedWithNewlines: Story = {
  args: {
    message: "Line one\nLine two\nAnd a third line that's also quite long",
    isSent: false,
  },
};

// Message with only newlines - sent
export const JustNewlines: Story = {
  args: {
    message: "\n\n\n\n\n\n\n\n\n\n\n",
    isSent: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This should be disallowed from within the component that submits the message.",
      },
    },
  },
};

// Message with only spaces - received
export const JustSpaces: Story = {
  args: {
    message: "                         ",
    isSent: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This should also be disallowed from within the component that submits the message.",
      },
    },
  },
};
