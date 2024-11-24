import type { Meta, StoryObj } from "@storybook/react";
import { Objective } from "./Objective";
import { expect, userEvent, waitFor, within } from "@storybook/test";

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
    objective: {
      id: 0,
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur rerum, asperiores blanditiis placeat explicabo ipsam optio laboriosam impedit quia, perspiciatis nostrum numquam reiciendis et consequuntur odit repudiandae quaerat? Tempore, ducimus!`,
    },
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

    await checkboxes.forEach(async (checkbox) => {
      await userEvent.click(checkbox);
    });

    await waitFor(() => {
      const element = canvasElement.querySelector("#completed");
      expect(element).toBeInTheDocument();
    });
  },
  args: {
    objective: {
      id: 0,
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur rerum, asperiores blanditiis placeat explicabo ipsam optio laboriosam impedit quia, perspiciatis nostrum numquam reiciendis et consequuntur odit repudiandae quaerat? Tempore, ducimus!`,
    },
    index: 0,
    deleteObjective: () => {},
  },
};
