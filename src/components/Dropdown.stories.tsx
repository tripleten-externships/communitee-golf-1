import { Dropdown } from "./Dropdown";

interface DropdownArgs {
  buttonText: string;
  items: string[];
}

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    buttonText: "Selected option",
    items: ["Golf Course one", "Golf Course two", "Golf Course three"],
    onSelect: (item: string) => console.log("Selected:", item),
  },
};

const Template = (args: DropdownArgs) => {
  const { buttonText, items } = args;
  return (
    <Dropdown
      buttonText={buttonText}
      items={items}
      onSelect={(item: string) => console.log("Selected:", item)}
    />
  );
};

export const Default = Template.bind({});
