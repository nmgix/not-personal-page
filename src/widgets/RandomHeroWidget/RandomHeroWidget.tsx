"use client"; // думал без директивы обойдётся, но const не создаются и ssr: false нельзя использовать
import { AvailableModels } from "@/components/Specialized/ModelViewer";
import classnames from "classnames";
import dynamic from "next/dynamic";
import { cloneElement } from "react";

const LatestNewsTabs = dynamic(() => import("../LatestNewsTabs").then(mod => mod.LatestNewsTabs), {
  loading: () => <p>latest tabs skeleton loader here</p>
});

const ModelViewer = dynamic(() => import("../../components/Specialized/ModelViewer").then(mod => mod.ModelViewer), {
  loading: () => <p>model viewer skeleton loader here</p>,
  ssr: false
});
export const variants = {
  tabs: <LatestNewsTabs />
  // viewer: (
  //   <ModelViewer
  //     renderModelTitle={Object.keys(AvailableModels)[Math.floor(Math.random() * Object.keys(AvailableModels).length)] as keyof typeof AvailableModels}
  //   />
  // )
};
const selectedComponentName = Object.keys(variants)[Math.floor(Math.random() * Object.keys(variants).length)] as keyof typeof variants;
const component = variants[selectedComponentName];

type RandomHeroWidgetProps = {
  externalClassnames?: string | string[];
  externalWidgetClassnames?: { [id in keyof typeof variants]?: string };
};

export const RandomHeroWidget = ({ externalClassnames, externalWidgetClassnames }: RandomHeroWidgetProps) => {
  return (
    <div className={classnames(externalClassnames)}>
      {cloneElement(component, { externalClassnames: classnames(externalWidgetClassnames && externalWidgetClassnames[selectedComponentName]) })}
    </div>
  );
};
