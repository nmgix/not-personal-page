import { PageTree } from "../types";
import classnames from "classnames";
import styles from "./tree-render.module.scss";
import Link from "next/link";
import { useRef } from "react";

type ShaderTreeProps = {
  prevPath?: string;
  externalNodeClassnames?: string | string[];
  externalTreeClassnames?: string | string[];
};

function TreeNode({
  node,
  prevPath,
  externalNodeClassnames,
  externalTreeClassnames
}: {
  node: PageTree;
} & ShaderTreeProps) {
  const { children, href, label, noLink } = node;
  const fullPath = useRef(prevPath !== undefined ? [prevPath, href].join("") : href);

  return (
    <div className={classnames(styles.treeNode, externalNodeClassnames)}>
      <div className={styles.label}>{noLink ? <span>{label}</span> : <Link href={fullPath.current}>{label}</Link>}</div>

      <ul className={styles.children}>
        {children !== undefined && children.length > 0 && (
          <Tree
            prevPath={prevPath !== undefined ? fullPath.current : undefined}
            externalTreeClassnames={classnames(externalTreeClassnames)}
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
  externalNodeClassnames,
  externalTreeClassnames
}: {
  treeData: PageTree[];
} & ShaderTreeProps) {
  return (
    <ul className={classnames(externalTreeClassnames)}>
      {treeData.map((node, idx) => (
        <TreeNode
          prevPath={prevPath}
          node={node}
          key={idx}
          externalNodeClassnames={externalNodeClassnames}
          externalTreeClassnames={externalTreeClassnames}
        />
      ))}
    </ul>
  );
}
