import { Dropdown } from "./Dropdown";
interface Item {
  id: string;
  name: string;
}

interface DropdownArgs {
  buttonText: string;
  items: Item[];
  onSelect: (item: string) => void;
}

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    buttonText: "Select Location",
    items: [
      { id: "1", name: "Golf Course one" },
      { id: "2", name: "Golf Course two" },
      { id: "3", name: "Golf Course three" },
    ],
    onSelect: (item: Item) => console.log("Selected:", item),
  },
};

const Template = (args: DropdownArgs) => {
  const { buttonText, items, onSelect } = args;
  return (
    <Dropdown
      buttonText={buttonText}
      items={items}
      onSelect={onSelect}
    />
  );
};

export const Default = Template.bind({});
