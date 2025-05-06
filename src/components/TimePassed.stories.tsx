import type { Meta, StoryObj } from "@storybook/react";

import TimePassed from "./TimePassed"; // Adjust the import path

// Define metadata for the component
const meta: Meta<typeof TimePassed> = {
  title: "Components/TimePassed", // How the story appears in the Storybook sidebar
  component: TimePassed,
  tags: ["autodocs"], // Enables automatic documentation generation
  argTypes: {
    // You can define controls for props here if needed,
    // but for timeReceived, specific scenarios are more useful.
    timestamp: {
      description:
        "Timestamp (milliseconds since epoch) when the event occurred.",
      control: "number", // Allows manual input in Storybook controls, though less practical here
    },
  },
  parameters: {
    // Optional: Add layout parameters or other configurations
    layout: "centered",
  },
};

export default meta;

// Define the Story type based on the component
type Story = StoryObj<typeof TimePassed>;

// --- Stories ---

// Story 1: Time received a few seconds ago
export const FewSecondsAgo: Story = {
  args: {
    // Calculate a timestamp 5 seconds in the past
    timestamp: Date.now() - 5 * 1000,
  },
};

// Story 2: Time received a minute ago
export const MinuteAgo: Story = {
  args: {
    // Calculate a timestamp 60 seconds in the past
    timestamp: Date.now() - 60 * 1000,
  },
};

// Story 3: Time received just now
export const JustNow: Story = {
  args: {
    // Use the current timestamp
    timestamp: Date.now(), // Should display "0s ago"
  },
};

// Story 4: Time received much longer ago (e.g., 1 hour)
// Note: Your component currently only shows seconds.
export const HourAgo: Story = {
  args: {
    // Calculate a timestamp 1 hour in the past
    timestamp: Date.now() - 60 * 60 * 1000, // Will show 3600s ago (approx)
  },
};

// Story 5: With a specific fixed timestamp (useful for testing consistency)
const specificPastTimestamp = new Date("2023-10-27T10:00:00Z").getTime();
export const FixedTimestamp: Story = {
  args: {
    timestamp: specificPastTimestamp,
  },
  parameters: {
    docs: {
      description: {
        story: `Displays time passed since a fixed date (${new Date(
          specificPastTimestamp
        ).toLocaleString()}). The output will increase over time.`,
      },
    },
  },
};
