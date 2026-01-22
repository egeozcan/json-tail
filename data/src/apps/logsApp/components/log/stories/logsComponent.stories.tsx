import type { Meta, StoryObj } from "@storybook/react";
import { TextCopyButton } from "../../common/buttons/TextCopyButton";

const meta: Meta<typeof TextCopyButton> = {
  title: "Other Stuff",
  component: TextCopyButton,
};

export default meta;

type Story = StoryObj<typeof TextCopyButton>;

export const CopyButton: Story = {
  render: () => <TextCopyButton getCopyString={() => "Test"} />,
};
