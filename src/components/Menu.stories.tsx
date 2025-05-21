import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AuthProvider } from "../contexts/AuthContext";
import Menu, { Message } from "./Menu";

const mockLocations = [
  { id: "1", name: "Pine Valley Golf Club" },
  { id: "2", name: "Augusta National Golf Club" },
  { id: "3", name: "Pebble Beach Golf Links" },
];

const now = Date.now();
const mockMessagesData: Message[] = [
  {
    id: "msg-1",
    clientName: "Bob Buddy Boy",
    clientImage: "https://example.com/image1.jpg",
    unreadCount: 0,
    lastMessageAt: new Date(now - 68_000).toISOString(),
    lastMessage: "Short message",
    locationId: "1",
  },
  {
    id: "msg-2",
    clientName: "Bobby Bot",
    clientImage: "https://example.com/image2.jpg",
    unreadCount: 70,
    lastMessageAt: new Date(now - 95_000).toISOString(),
    lastMessage: "Short message",
    locationId: "1",
  },
  {
    id: "msg-3",
    clientName: "Carson Carl Jr.",
    clientImage: "https://example.com/image3.jpg",
    unreadCount: 2,
    lastMessageAt: new Date(now - 6_800_000).toISOString(),
    lastMessage:
      "This is a long message, where the sentence is very redundant and long because it is long",
    locationId: "2",
  },
  {
    id: "msg-4",
    clientName: "Kaytlyn Lyn Lynda",
    clientImage: "https://example.com/image4.jpg",
    unreadCount: 50,
    lastMessageAt: new Date(now - 2_400_000).toISOString(),
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
    selected: null,
    locations: mockLocations,
    messagesArray: [],
    onSelect: action("onSelect"),
  },
};

export const PineValley: Story = {
  args: {
    selected: mockLocations[0].name,
    locations: mockLocations,
    messagesArray: getMessagesFor(mockLocations[0].name),
    onSelect: action("onSelect"),
  },
};

export const Augusta: Story = {
  args: {
    selected: mockLocations[1].name,
    locations: mockLocations,
    messagesArray: getMessagesFor(mockLocations[1].name),
    onSelect: action("onSelect"),
  },
};

export const PebbleBeach: Story = {
  args: {
    selected: mockLocations[2].name,
    locations: mockLocations,
    messagesArray: getMessagesFor(mockLocations[2].name),
    onSelect: action("onSelect"),
  },
};
