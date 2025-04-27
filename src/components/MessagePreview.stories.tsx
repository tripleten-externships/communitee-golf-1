import type { Meta, StoryObj } from "@storybook/react";

// Assuming MessagePreview uses the updated TimePassed internally
import MessagePreview from "./MessagePreview"; // Adjust the import path to your component

const meta: Meta<typeof MessagePreview> = {
  title: "Components/MessagePreview",
  component: MessagePreview,
  tags: ["autodocs"],
  argTypes: {
    // Define controls for the props of the MessagePreview component
    message: {
      control: "object",
      description:
        "Object containing message data, including username, picture, messageid, text, and timestamp.",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof MessagePreview>;

// --- Stories covering different time passed cases based on TimePassed.tsx logic ---

// Case: seconds < 60 -> "Just now"
export const JustNow: Story = {
  args: {
    message: {
      username: "Alice", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg1", // Changed id to messageid
      text: "A message sent just now.",
      timestamp: Date.now() - 30 * 1000, // 30 seconds ago
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Displays 'Just now' for timestamps less than 1 minute ago.",
      },
    },
  },
};

// Case: minutes < 60 -> "Xmin" (Covers 1 minute up to 59 minutes)
export const MinutesAgo: Story = {
  args: {
    message: {
      username: "Bob", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg2", // Changed id to messageid
      text: "A message from a few minutes ago.",
      timestamp: Date.now() - 15 * 60 * 1000, // 15 minutes ago
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays 'Xmin' for timestamps between 1 minute and 59 minutes ago.",
      },
    },
  },
};

// Case: hours < 24 -> "Xh" (Covers 1 hour up to 23 hours)
export const HoursAgo: Story = {
  args: {
    message: {
      username: "Charlie", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg3", // Changed id to messageid
      text: "A message from a few hours ago.",
      timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Displays 'Xh' for timestamps between 1 hour and 23 hours ago.",
      },
    },
  },
};

// Case: isYesterday() -> "Yesterday"
// Need to calculate a timestamp that falls on the previous calendar day
const now = new Date();
const todayMidnight = new Date(now);
todayMidnight.setHours(0, 0, 0, 0); // Set to the beginning of today
const yesterdayMidnight = new Date(
  todayMidnight.getTime() - 24 * 60 * 60 * 1000
); // Exactly 24 hours before today's midnight
const yesterdayTimestamp = yesterdayMidnight.getTime() + 12 * 60 * 60 * 1000; // Add 12 hours to be noon yesterday

export const Yesterday: Story = {
  args: {
    message: {
      username: "David", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg4", // Changed id to messageid
      text: "A message sent yesterday.",
      timestamp: yesterdayTimestamp, // Timestamp set to yesterday noon
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays 'Yesterday' for timestamps from the previous calendar day.",
      },
    },
  },
};

// Case: days < 7 -> "X days ago" (Covers 2 days ago up to 6 days ago, excluding "Yesterday")

// 2 days ago
export const TwoDaysAgo: Story = {
  args: {
    message: {
      username: "Eve", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg5", // Changed id to messageid
      text: "A message from exactly two days ago.",
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 - 1000, // 2 days ago minus a second to be sure `days` is 2
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Displays 'X days ago' for timestamps 2 days ago.",
      },
    },
  },
};

// 3 days ago
export const ThreeDaysAgo: Story = {
  args: {
    message: {
      username: "Frank", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg6", // Changed id to messageid
      text: "A message from three days ago.",
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 - 1000, // 3 days ago minus a second
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Displays 'X days ago' for timestamps 3 days ago.",
      },
    },
  },
};

// 6 days ago
export const SixDaysAgo: Story = {
  args: {
    message: {
      username: "Grace", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg7", // Changed id to messageid
      text: "A message from six days ago. This also has some extra text.",
      timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000 - 1000, // 6 days ago minus a second
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Displays 'X days ago' for timestamps 6 days ago.",
      },
    },
  },
};

// Case: else (implicitly days >= 7) -> "MMM D"

// 7 days ago
export const SevenDaysAgo: Story = {
  args: {
    message: {
      username: "Heidi", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg8", // Changed id to messageid
      text: "A message from exactly seven days ago. And it has some extra text.",
      timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // Exactly 7 days ago
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Displays 'MMM D' for timestamps exactly 7 days ago.",
      },
    },
  },
};

// A fixed date far in the past
const fixedDateInPastTimestamp = new Date("2023-07-15T10:30:00Z").getTime();
export const FixedDateInPast: Story = {
  args: {
    message: {
      username: "Ivan", // Added username
      picture: "/pfp_img-placeholder.jpg", // Added picture
      messageid: "msg9", // Changed id to messageid
      text: "A message from a specific fixed date.",
      timestamp: fixedDateInPastTimestamp,
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Displays 'MMM D' for a fixed timestamp far in the past (${new Date(
          fixedDateInPastTimestamp
        ).toLocaleDateString()}). Confirms the date formatting.`,
      },
    },
  },
};
