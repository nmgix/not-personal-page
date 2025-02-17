import type { Preview } from "@storybook/react";

import "../src/styles/themes.scss";
import "../src/styles/global.styles.scss";
import "../src/components/Generic/components.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      values: [{ name: "Standard", value: "#111111" }],
      default: "Standard"
    }
  }
};

export default preview;
