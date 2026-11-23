import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "../components/Badge";

const meta: Meta<typeof Badge> = {
  title: "Design System/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "discount",
        "deal",
        "stock",
        "out-of-stock",
        "count",
        "brand",
        "info",
        "subtle",
      ],
    },
    dot: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Discount: Story = {
  args: {
    variant: "discount",
    children: "-23% OFF",
  },
};

export const Deal: Story = {
  args: {
    variant: "deal",
    children: "Deal of the Day",
  },
};

export const InStock: Story = {
  args: {
    variant: "stock",
    dot: true,
    children: "In Stock",
  },
};

export const OutOfStock: Story = {
  args: {
    variant: "out-of-stock",
    children: "Out of Stock",
  },
};

export const Brand: Story = {
  args: {
    variant: "brand",
    children: "FRESH",
  },
};

export const CategoryCount: Story = {
  args: {
    variant: "count",
    children: "86 items",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Cold Chain",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    children: "Organic Certified",
  },
};
