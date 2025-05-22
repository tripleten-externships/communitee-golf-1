import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AuthProvider } from "../contexts/AuthContext";
import Menu, { Message } from "./Menu";

const mockLocations = [
  { id: "1", name: "Pine Valley Golf Club" },
  { id: "2", name: "Augusta National Golf Club" },
  { id: "3", name: "Pebble Beach Golf Links" },
];

const mockMessagesData: Message[] = [
  {
    id: "msg-1",
    clientName: "Bob Buddy Boy",
    clientImage: "https://example.com/image1.jpg",
    unreadCount: 0,
    lastMessageAt: Date.now() - 6800000,
    lastMessage: "Short message",
    locationId: "1",
  },
  {
    id: "msg-2",
    clientName: "Bobby Bot",
    clientImage: "https://example.com/image2.jpg",
    unreadCount: 70,
    lastMessageAt: Date.now() - 2400000,
    lastMessage: "Short message",
    locationId: "1",
  },
  {
    id: "msg-3",
    clientName: "Carson Carl Jr.",
    clientImage: "https://example.com/image3.jpg",
    unreadCount: 2,
    lastMessageAt: Date.now() - 95000,
    lastMessage:
      "This is a long message, where the sentence is very redundant and long because it is long",
    locationId: "2",
  },
  {
    id: "msg-4",
    clientName: "Kaytlyn Lyn Lynda",
    clientImage: "https://example.com/image4.jpg",
    unreadCount: 50,
    lastMessageAt: Date.now() - 2400000,
    lastMessage:
      "This is another long message, testing multiline display in the preview",
    locationId: "3",
  },
];

function getMessagesFor(selected: string | null) {
  return selected
    ? mockMessagesData.filter(
        (m) =>
          m.locationId === mockLocations.find((l) => l.name === selected)!.id
      )
    : [];
}

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    messagesArray: [],
    onSelect: action("onSelect"),
  },
};

export const PineValley: Story = {
  args: {
    messagesArray: getMessagesFor(mockLocations[0].name),
    onSelect: action("onSelect"),
  },
};

export const AugustaNational: Story = {
  args: {
    messagesArray: getMessagesFor(mockLocations[1].name),
    onSelect: action("onSelect"),
  },
};

export const PebbleBeach: Story = {
  args: {
    messagesArray: getMessagesFor(mockLocations[2].name),
    onSelect: action("onSelect"),
  },
};
