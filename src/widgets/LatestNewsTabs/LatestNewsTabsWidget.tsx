import dynamic from "next/dynamic";

const LatestNewsTabsWidget = dynamic(() => import("./LatestNewsTabs").then(mod => mod.LatestNewsTabs), {
  loading: () => <p>latest tabs skeleton loader here</p>,
  ssr: true
});

export default LatestNewsTabsWidget;
