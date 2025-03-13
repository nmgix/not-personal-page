import type { Preview } from "@storybook/react";

import "../src/styles/global.styles.scss";
import "../src/components/Generic/components.scss";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

import classnames from "classnames";
import { usedFonts } from "../src/types/consts";

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
  },
  decorators: [
    Story => {
      return (
        <div className={classnames(...usedFonts.map(f => f.variable))}>
          <Story />
        </div>
      );
    }
  ]
};

export default preview;
