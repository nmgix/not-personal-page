import type { Args, Meta, StoryObj } from "@storybook/react";

import { Tree } from "./TreeRender";

const meta = {
  title: "Widgets/SiteMap/TreeRender",
  component: Tree,
  args: {}
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

// это пример для сториса
export const Default: Story = {
  args: {
    treeData: [
      {
        href: "/home",
        label: "/home"
      },
      {
        href: "/tech-articles",
        label: "/tech-articles",
        children: [
          {
            href: "/article/*",
            label: "/article/*",
            noLink: true,
            children: [
              {
                href: "/home",
                label: "/tech-home",
                children: [
                  {
                    href: "/projects",
                    label: "/tech-home-projects",
                    children: [
                      {
                        href: "/article/*",
                        label: "/article/*",
                        noLink: true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        href: "/blog",
        label: "/blog",
        children: [
          {
            href: "/article/*",
            label: "/article/*",
            noLink: true,
            children: [
              {
                href: "/projects",
                label: "/blogs-projects",
                children: [
                  {
                    href: "/article/*",
                    label: "/article/*",
                    noLink: true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        href: "/projects",
        label: "/projects",
        children: [
          {
            href: "/article/*",
            label: "/article/*",
            noLink: true
          }
        ]
      }
    ],
    prevPath: "" //тоже подойдёт
  }
};
