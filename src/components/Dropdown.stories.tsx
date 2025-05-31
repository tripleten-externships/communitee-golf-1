import { Dropdown } from "./Dropdown";
interface Item {
  id: string;
  title: string;
}

interface DropdownArgs {
  buttonText: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    buttonText: "Select Location",
    items: [
      { id: "1", title: "Golf Course one" },
      { id: "2", title: "Golf Course two" },
      { id: "3", title: "Golf Course three" },
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
