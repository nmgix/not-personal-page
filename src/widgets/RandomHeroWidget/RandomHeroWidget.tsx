"use client"; // думал без директивы обойдётся, но const не создаются и ssr: false нельзя использовать
import { AvailableModels } from "@/components/Specialized/ModelViewer";
import dynamic from "next/dynamic";

const LatestNewsTabs = dynamic(() => import("../LatestNewsTabs").then(mod => mod.LatestNewsTabs), {
  loading: () => <p>latest tabs skeleton loader here</p>
});

const ModelViewer = dynamic(() => import("../../components/Specialized/ModelViewer").then(mod => mod.ModelViewer), {
  loading: () => <p>model viewer skeleton loader here</p>,
  ssr: false
});
const variants = [
  <LatestNewsTabs />,
  <ModelViewer
    renderModelTitle={Object.keys(AvailableModels)[Math.floor(Math.random() * Object.keys(AvailableModels).length)] as keyof typeof AvailableModels}
  />
];
const component = variants[Math.floor(Math.random() * variants.length)];

export const RandomHeroWidget = () => {
  return <div>{component}</div>;
};
