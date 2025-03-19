// "use client"; // думал без директивы обойдётся, но const не создаются и ssr: false нельзя использовать
import { ExternalClassnames } from "@/types/components";
import classnames from "classnames";
import { cloneElement } from "react";
import LatestNewsTabsWidget from "../LatestNewsTabs/LatestNewsTabsWidget";

type RandomHeroWidgetProps = {
  externalWidgetClassnames?: { [id in keyof typeof variants]?: string };
} & ExternalClassnames;

export const variants = {
  tabs: <LatestNewsTabsWidget />
  // viewer: (
  //   <ModelViewerWidget
  //     renderModelTitle={Object.keys(AvailableModels)[Math.floor(Math.random() * Object.keys(AvailableModels).length)] as keyof typeof AvailableModels}
  //   />
  // )
};

export const RandomHeroWidget = ({ externalClassnames, externalWidgetClassnames }: RandomHeroWidgetProps) => {
  const selectedComponentName = Object.keys(variants)[Math.floor(Math.random() * Object.keys(variants).length)] as keyof typeof variants;
  const component = variants[selectedComponentName];

  if (component === undefined) return null;
  return (
    <div className={classnames(externalClassnames)}>
      {cloneElement(component, { externalClassnames: classnames(externalWidgetClassnames && externalWidgetClassnames[selectedComponentName]) })}
    </div>
  );
};
