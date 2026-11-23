import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { Sparkles, Trash2, CheckCircle2 } from "lucide-react";
import Dialog from "../components/Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Design System/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
    iconVariant: {
      control: "select",
      options: ["brand", "success", "danger", "warning", "info", "neutral"],
    },
    confirmVariant: {
      control: "select",
      options: ["primary", "danger", "dark"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold px-5 py-2.5 rounded-lg text-xs uppercase"
        >
          Open Standard Dialog
        </button>
        <Dialog
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Summer Harvest Flash Deals"
          description="Enjoy up to 40% off on all seasonal organic fruits and pantry essentials today only."
          icon={<Sparkles className="w-6 h-6" />}
          iconVariant="brand"
          size="md"
          confirmText="Claim Offer"
          cancelText="Maybe Later"
          onConfirm={() => setOpen(false)}
        >
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <p className="font-bold">Exclusive Member Discount Code:</p>
            <p className="font-mono text-base font-black">SUMMERFARM40</p>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const Destructive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase"
        >
          Delete Cart Item
        </button>
        <Dialog
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Remove from Cart?"
          description="Are you sure you want to remove this organic produce item from your basket?"
          icon={<Trash2 className="w-6 h-6" />}
          iconVariant="danger"
          size="sm"
          confirmText="Yes, Remove"
          confirmVariant="danger"
          cancelText="Keep Item"
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const Success: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase"
        >
          Order Confirmed
        </button>
        <Dialog
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Order #FM-9482 Confirmed!"
          description="Your farm fresh grocery delivery has been scheduled for same-day dispatch."
          icon={<CheckCircle2 className="w-6 h-6" />}
          iconVariant="success"
          size="md"
          confirmText="Track Delivery"
          confirmVariant="primary"
          cancelText="Done"
          onConfirm={() => setOpen(false)}
        >
          <p className="text-xs text-gray-600">
            Estimated arrival: <strong>Today, 3:30 PM - 4:00 PM</strong> via Temperature-controlled Cold Chain van.
          </p>
        </Dialog>
      </div>
    );
  },
};
