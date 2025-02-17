import { PageTree } from "../types";
import classnames from "classnames";
import styles from "./tree-render.module.scss";
import Link from "next/link";
import { useRef } from "react";
import { ExternalClassnames } from "@/types/components";

type ShaderTreeProps = {
  prevPath?: string;
  nodeProps?: {} & ExternalClassnames;
  treeProps?: {} & ExternalClassnames;
};

function TreeNode({
  node,
  prevPath,
  nodeProps
}: // treeProps
{
  node: PageTree;
} & ShaderTreeProps) {
  const { children, href, label, noLink } = node;
  const fullPath = useRef(prevPath !== undefined ? [prevPath, href].join("") : href);

  return (
    <div className={classnames(styles.treeNode, nodeProps)}>
      <div className={styles.label}>{noLink ? <span>{label}</span> : <Link href={fullPath.current}>{label}</Link>}</div>

      <ul className={styles.children}>
        {children !== undefined && children.length > 0 && (
          <Tree
            prevPath={prevPath !== undefined ? fullPath.current : undefined}
            treeProps={{ externalClassnames: classnames(nodeProps?.externalClassnames) }}
            treeData={children}
          />
        )}
      </ul>
    </div>
  );
}

export function Tree({
  treeData,
  prevPath,
  nodeProps,
  treeProps
}: {
  treeData: PageTree[];
} & ShaderTreeProps) {
  return (
    <ul className={classnames(treeProps?.externalClassnames)}>
      {treeData.map((node, idx) => (
        <TreeNode
          prevPath={prevPath}
          node={node}
          key={idx}
          nodeProps={{ externalClassnames: nodeProps?.externalClassnames }}
          treeProps={{ externalClassnames: treeProps?.externalClassnames }}
        />
      ))}
    </ul>
  );
}
