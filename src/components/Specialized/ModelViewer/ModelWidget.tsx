"use client";

import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";

const ModelViewerWidget = dynamic(() => import("./ModelViewer").then(mod => mod.ModelViewer), {
  loading: () => {
    return (
      <div>
        <span style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 12 }}>
          <span style={{ color: "var(--color-font-darken)", fontWeight: 100 }}>&#91;work example&#93;</span>{" "}
          <Skeleton style={{ backgroundColor: "gray", width: 150 }} />
        </span>
        <div className='box' style={{ aspectRatio: "4/3" }} />
      </div>
    );
  },
  ssr: false
});

export default ModelViewerWidget;
