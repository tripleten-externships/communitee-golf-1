import { Dropdown } from "./Dropdown";

interface DropdownArgs {
  buttonText: string;
  items: string[];
}

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    buttonText: "Glory Golf Course",
    items: ["Golf Course one", "Golf Course two", "Golf Course three"],
  },
};

const Template = (args: DropdownArgs) => {
  const { buttonText, items } = args;

  return (
    <Dropdown
      buttonText={buttonText}
      content={
        <ul className="py-2 space-y-[10px]">
          {items.map((item, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{item}</li>
          ))}
        </ul>
      }
    />
  );
};

export const Default = Template.bind({});
