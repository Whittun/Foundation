import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default button status",
      },
    },
  },
  args: {
    text: "Default Button",
    disabled: false,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Disabled button status",
      },
    },
  },
  args: {
    text: "Disabled Button",
    disabled: true,
  },
};
