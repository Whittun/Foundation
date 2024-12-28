import { StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { useArgs } from "@storybook/preview-api";
import { ChangeEvent } from "react";

export default {
  title: "Components/Input",
  component: Input,
};

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    value: "",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      updateArgs({ value: event.target.value });
    };

    return <Input {...args} setValue={handleChange} value={value} />;
  },
};
