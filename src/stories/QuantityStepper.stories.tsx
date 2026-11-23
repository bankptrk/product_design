import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import QuantityStepper from "../components/QuantityStepper";

const meta: Meta<typeof QuantityStepper> = {
  title: "Design System/QuantityStepper",
  component: QuantityStepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(1);
    return <QuantityStepper {...args} value={value} onChange={setValue} />;
  },
  args: {
    size: "md",
    min: 1,
    max: 99,
  },
};

export const Small: Story = {
  render: (args) => {
    const [value, setValue] = useState(1);
    return <QuantityStepper {...args} value={value} onChange={setValue} />;
  },
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  render: (args) => {
    const [value, setValue] = useState(2);
    return <QuantityStepper {...args} value={value} onChange={setValue} />;
  },
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState(1);
    return <QuantityStepper {...args} value={value} onChange={setValue} disabled />;
  },
};
