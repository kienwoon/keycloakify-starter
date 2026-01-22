import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

// Create KcPageStory for the "forget-password.ftl" page
const { KcPageStory } = createKcPageStory({ pageId: "forget-password.ftl" });

const meta = {
    title: "login/forget-password.ftl",
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
                        existsError: (field: string) => field == "username" || field === "hint" || field === "hint-answer",
                        get: (field: string) => {
                            if (field === "username") return "Username is required";
                            if (field === "hint") return "Hint is required";                            
                            if (field === "hint-answer") return "Hint answer is required";
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
                    existsError: (field: string) => field == "username" || field === "hint" || field === "hint-answer",
                    get: (field: string) => {
                        if (field === "username") return "Username is required";
                        if (field === "hint") return "Hint is too vague";
                        if (field === "hint-answer") return "Hint answer is required";
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
                    existsError: (field: string) => field == "username" || field === "hint" || field === "hint-answer",
                    get: (_field: string) => "This field is required"
                }
            }}
        />
    )
};
