import type { Preview } from "@storybook/react";
import "../src/styles/global.css";
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS, DEFAULT_VIEWPORT } from "@storybook/addon-viewport";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        viewport: {
            viewports: {
                ...MINIMAL_VIEWPORTS,
                ...INITIAL_VIEWPORTS
            },
            defaultViewport: DEFAULT_VIEWPORT
        }
    }
};

export default preview;
