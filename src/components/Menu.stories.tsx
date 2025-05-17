import type { Meta, StoryObj } from "@storybook/react";
import { Menu, Message} from "./Menu";
import { AuthProvider } from "../contexts/AuthContext";

const mockLocations = [
    { id: "1", name: "Pine Valley Golf Club" },
    { id: "2", name: "Augusta National Golf Club" },
    { id: "3", name: "Pebble Beach Golf Links" },
];

const mockMessagesData: Message[] = [
    {
        clientName: "Bob Buddy Boy",
        clientImage: 'https://example.com/image1.jpg',
        unreadCount: 0,
        lastMessageAt: Date.now() - 68000,
        lastMessage: "Short message",
        locationId: "1",
    },
    {
        clientName: "Bobby Bot",
        clientImage: 'https://example.com/image1.jpg',
        unreadCount: 70,
        lastMessageAt: Date.now() - 95000,
        lastMessage: "Short message",
        locationId: "1",
    },
    {
        clientName: "Carson Carl Jr.",
        clientImage: 'https://example.com/image1.jpg',
        unreadCount: 2,
        lastMessageAt: Date.now() - 6800000,
        lastMessage: "This is a long message, where the sentence is very redundant and long because it is long",
        locationId: "2"
    },
    {
        clientName: "Kaytlyn Lyn Lynda",
        clientImage: 'https://example.com/image1.jpg',
        unreadCount: 50,
        lastMessageAt: Date.now() - 2400000,
        lastMessage: "this is a long message, where the sentence is very redundant and long because it is long",
        locationId: "3"
    },
];

function getMessagesForSelected(selected: string | null) {
    if (!selected) return [];
    return mockMessagesData.filter(msg => msg.locationId === selected);
  }
  

const meta: Meta<typeof Menu> = {
    title: "Components/Menu",
    component: Menu,
    decorators: [
        (Story) =>(
            <AuthProvider>
                <Story />
            </AuthProvider>
        )
    ]
  };

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
    args: {
      selected: null,
      locations: [],
    },
};

export const PineValleyGolfClub: Story = {
    args: {
        selected: mockLocations[0].name,
        locations: mockLocations,
        messagesArray: getMessagesForSelected("1"),
      },
};

export const AugustaNationalGolfClub: Story = {
    args: {
        selected: mockLocations[0].name,
        locations: mockLocations,
        messagesArray: getMessagesForSelected("2"),
      },
};

export const PebbleBeachGolfLinks: Story = {
    args: {
        selected: mockLocations[0].name,
        locations: mockLocations,
        messagesArray: getMessagesForSelected("3"),
      },
};