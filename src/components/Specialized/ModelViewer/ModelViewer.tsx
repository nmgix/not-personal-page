"use client";
import classnames from "classnames";
import styles from "./model-viewer.module.scss";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Icon } from "@/components/Generic/Icon";
import { ErrorBoundary } from "@/components/Specialized/ErrorBoundary";
// import { ErrorBoundary } from "next/dist/client/components/error-boundary";
// import { ErrorBoundary } from "@react-three/fiber/dist/declarations/src/core/utils";

export const AvailableModels = {
  dragons_liberation: "gltf/dragons_liberation.glb",
  corkboard: "gltf/corkboard.glb"
} as const;

type ModelViewerProps = {
  renderModelTitle: keyof typeof AvailableModels;
};

const publicModelPath = "models";

export const ModelViewer = ({ renderModelTitle }: ModelViewerProps) => {
  const modelPath = `${publicModelPath}/${AvailableModels[renderModelTitle]}`;

  //   const modelRef=  useRef(null) <JSX.IntrinsicElements>
  //   const { scene } = useLoader(GLTFLoader, modelPath);
  const { scene } = useGLTF(modelPath, true, true);
  //   const { gl, camera } = useThree();
  //   useLayoutEffect(() => void gl.compile(scene, camera), []);
  // https://codesandbox.io/p/sandbox/11few?file=%2Fsrc%2Findex.js%3A16%2C29
  //   useFrame(() => (modelRef.current!.rotation.x = modelRef.current!.rotation.y += 0.01))
  //   const idk = (err: any) => console.log(err);

  return (
    <div className={classnames(styles.modelViewer)}>
      <div className={styles.infoBar}>
        <span className={styles.title}>&#91;work example&#93;</span>
        <span className={styles.workName}>{renderModelTitle}</span>
      </div>
      <div className={styles.viewRenderer}>
        {/* <ErrorBoundary set={idk}> */}
        <ErrorBoundary fallbackComponent={<span>error rendering model viewer UwU</span>}>
          <Canvas>
            <ambientLight intensity={0.25} />
            <Suspense fallback={null}>
              <Stage>
                <primitive object={scene} />
              </Stage>
              <OrbitControls makeDefault />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
        {/* </ErrorBoundary> */}
      </div>
      <Icon icon='drag-left' externalClassnames={styles.grabIcon} />
    </div>
  );
};
