// "use client"; // думал без директивы обойдётся, но const не создаются и ssr: false нельзя использовать
import { ExternalClassnames } from "@/types/components";
import { AvailableModels } from "@/types/consts";
import classnames from "classnames";
import dynamic from "next/dynamic";
import { cloneElement } from "react";
import ModelViewerWidget from "@/components/Specialized/ModelViewer/ModelWidget";

const LatestNewsTabs = dynamic(() => import("../LatestNewsTabs").then(mod => mod.LatestNewsTabs), {
  loading: () => <p>latest tabs skeleton loader here</p>,
  ssr: true
});

export const variants = {
  tabs: <LatestNewsTabs />,
  viewer: (
    <ModelViewerWidget
      renderModelTitle={Object.keys(AvailableModels)[Math.floor(Math.random() * Object.keys(AvailableModels).length)] as keyof typeof AvailableModels}
    />
  )
};

type RandomHeroWidgetProps = {
  externalWidgetClassnames?: { [id in keyof typeof variants]?: string };
} & ExternalClassnames;

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
