"use client";
import classnames from "classnames";
import styles from "./model-viewer.module.scss";

import { Suspense, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Icon } from "@/components/Generic/Icon";
import { ErrorBoundary } from "@/components/Specialized/ErrorBoundary";
// import { ErrorBoundary } from "next/dist/client/components/error-boundary";
// import { ErrorBoundary } from "@react-three/fiber/dist/declarations/src/core/utils";
import { useHold } from "@technarts/react-use-hold";
import useDebounced from "@/hooks/useDebounce";

export const AvailableModels = {
  dragons_liberation: "gltf/dragons_liberation.glb",
  corkboard: "gltf/corkboard.glb"
} as const;

type ModelViewerProps = {
  renderModelTitle: keyof typeof AvailableModels;
  externalClassnames?: string | string[];
};

const publicModelPath = "models";

const Model = ({ path, isHolding }: { path: string; isHolding: boolean }) => {
  const { scene } = useGLTF(path, true, true);
  useFrame(() => {
    if (isHolding) {
      scene.position.x = scene.position.y = scene.position.z = 0;
      return;
    }
    scene.rotation.y = scene.rotation.y += 0.005;
  });
  return <primitive object={scene} />;
};

export const ModelViewer = ({ renderModelTitle, externalClassnames }: ModelViewerProps) => {
  const modelPath = `${publicModelPath}/${AvailableModels[renderModelTitle]}`;

  // https://codesandbox.io/p/sandbox/11few?file=%2Fsrc%2Findex.js%3A16%2C29

  // dragons_liberation криво крутится ибо его  центр неправильный
  // https://stackoverflow.com/questions/57603896/three-js-translate-mesh-geometries-of-a-loaded-glb-model-to-have-same-center-wit
  // хз фикс ^ или нет

  const [pressed, setPressed] = useState(false);
  const removePressed = useDebounced(() => setPressed(false), 3000);
  const longPressEvent = useHold({
    ms: 100,
    onHold: () => setPressed(true),
    onRelease: removePressed
  }); // до сих пор баг с неработающим debounce

  return (
    <div className={classnames(styles.modelViewer, externalClassnames)}>
      <div className={styles.infoBar}>
        <span className={styles.title}>&#91;work example&#93;</span>
        <span className={styles.workName}>{renderModelTitle}</span>
      </div>
      <div className={styles.viewRenderer}>
        <ErrorBoundary fallbackComponent={<span>error rendering model viewer UwU</span>}>
          <Canvas {...longPressEvent}>
            <ambientLight intensity={0.25} />
            <Suspense fallback={null}>
              <Stage>
                <Model path={modelPath} isHolding={pressed} />
              </Stage>
              <OrbitControls makeDefault />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>
      <Icon icon='drag-left' externalClassnames={styles.grabIcon} />
    </div>
  );
};
