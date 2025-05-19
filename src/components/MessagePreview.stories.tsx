import type { Meta, StoryObj } from "@storybook/react";

// Assuming MessagePreview uses the updated TimePassed internally
import MessagePreview from "./MessagePreview"; // Adjust the import path to your component

const testImagePath =
  "https://plus.unsplash.com/premium_photo-1746718185601-ea2d45a7a26e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const meta: Meta<typeof MessagePreview> = {
  title: "Components/MessagePreview",
  component: MessagePreview,
  tags: ["autodocs"],
  argTypes: {
    // Define controls for the props of the MessagePreview component
    previewProps: {
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
    previewProps: {
      clientName: "Alice", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: 4,
      lastMessage: "A message sent just now.",
      lastMessageAt: new Date(Date.now() - 30 * 1000).toISOString(), // 30 seconds ago
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
    previewProps: {
      clientName: "Bob", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: 1,
      lastMessage: "A message from a few minutes ago.",
      lastMessageAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
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
    previewProps: {
      clientName: "Charlie", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: 0,
      lastMessage: "A message from a few hours ago.",
      lastMessageAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
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
    previewProps: {
      clientName: "David", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: 10,
      lastMessage: "A message sent yesterday.",
      lastMessageAt: new Date(yesterdayTimestamp).toISOString(), // Timestamp set to yesterday noon
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
    previewProps: {
      clientName: "Eve", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: 100,
      lastMessage: "A message from exactly two days ago.",
      lastMessageAt: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000 - 1000
      ).toISOString(), // 2 days ago minus a second to be sure `days` is 2
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
    previewProps: {
      clientName: "Frank", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: -1,
      lastMessage: "A message from three days ago.",
      lastMessageAt: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 - 1000
      ).toISOString(), // 3 days ago minus a second
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
    previewProps: {
      clientName: "Grace", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: 10,
      lastMessage:
        "A message from six days ago. This also has some extra text.",
      lastMessageAt: new Date(
        Date.now() - 6 * 24 * 60 * 60 * 1000 - 1000
      ).toISOString(), // 6 days ago minus a second
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
    previewProps: {
      clientName: "Heidi", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: 99,
      lastMessage:
        "A message from exactly seven days ago. And it has some extra text.",
      lastMessageAt: new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // Exactly 7 days ago
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
    previewProps: {
      clientName: "Ivan", // Added username
      clientImage: testImagePath, // Added picture
      unreadCount: 1,
      lastMessage: "A message from a specific fixed date.",
      lastMessageAt: new Date(fixedDateInPastTimestamp).toISOString(),
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

// No image provided
export const NoImageFallback: Story = {
  args: {
    previewProps: {
      clientName: "Zara",
      clientImage: "",
      unreadCount: 2,
      lastMessage: "This user has no profile picture.",
      lastMessageAt: new Date(Date.now() - 60 * 1000).toISOString(), // 1 minute ago
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Uses default placeholder image when clientImage is missing or empty.",
      },
    },
  },
};

// Case: Broken image URL triggers onError fallback
export const BrokenImageFallback: Story = {
  args: {
    previewProps: {
      clientName: "Xavier",
      clientImage: "https://www.fakestuff.example/fakeImage", // Invalid path
      unreadCount: 3,
      lastMessage: "Image failed to load.",
      lastMessageAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Simulates a broken image URL to test the `onError` fallback.",
      },
    },
  },
};
