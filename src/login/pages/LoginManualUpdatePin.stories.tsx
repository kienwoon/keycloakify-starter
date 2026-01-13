import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

// Create KcPageStory for the "login-manual-update-pin.ftl" page
const { KcPageStory } = createKcPageStory({ pageId: "login-manual-update-pin.ftl" });

const meta = {
    title: "login/login-manual-update-pin.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithPinErrors: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (field: string) => field === "pin" || field === "pin-confirm",
                    get: (field: string) => {
                        if (field === "pin") return "Pin must be at least 6 characters long";
                        if (field === "pin-confirm") return "Pins do not match";
                        return "";
                    }
                }
            }}
        />
    )
};

export const AppInitiatedAction: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                isAppInitiatedAction: true
            }}
        />
    )
};

export const MultipleErrors: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (field: string) => field === "pin" || field === "pin-confirm",
                    get: (field: string) => {
                        if (field === "pin") return "Pin is too weak";
                        if (field === "pin-confirm") return "Pin confirmation does not match";
                        return "";
                    }
                }
            }}
        />
    )
};

export const EmptyFormSubmit: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (field: string) => field === "pin" || field === "pin-confirm",
                    get: (_field: string) => "This field is required"
                }
            }}
        />
    )
};