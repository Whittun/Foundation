import type { Meta, StoryObj } from "@storybook/react";
import { Objective } from "./Objective";
import { expect, userEvent, within } from "@storybook/test";

const meta: Meta<typeof Objective> = {
  title: "Components/Objective",
  component: Objective,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Objective>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: "",
      },
    },
  },
  args: {
    index: 0,
    deleteObjective: () => {},
  },
};

export const Completed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Displays the executed state on its tab and also tests this functionality",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkboxes = canvas.getAllByRole("checkbox");

    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    const element = await canvas.findByText("Completed!");
    expect(element).toBeInTheDocument();
  },
  args: {
    index: 0,
    deleteObjective: () => {},
  },
};
