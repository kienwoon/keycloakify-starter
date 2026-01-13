import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

// Create KcPageStory for the "login-manual-update-password.ftl" page
const { KcPageStory } = createKcPageStory({ pageId: "login-manual-update-password.ftl" });

const meta = {
    title: "login/login-manual-update-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithPasswordErrors: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (field: string) => field === "password" || field === "password-confirm",
                    get: (field: string) => {
                        if (field === "password") return "Password must be at least 8 characters long";
                        if (field === "password-confirm") return "Passwords do not match";
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
                    existsError: (field: string) => field === "password" || field === "password-confirm",
                    get: (field: string) => {
                        if (field === "password") return "Password is too weak";
                        if (field === "password-confirm") return "Password confirmation does not match";
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
                    existsError: (field: string) => field === "password" || field === "password-confirm",
                    get: (_field: string) => "This field is required"
                }
            }}
        />
    )
};
