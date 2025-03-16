import { getDocBySlugShorten } from "@/serverfunctions/getDoc";
import classnames from "classnames";
import { JSX, memo } from "react";
import styles from "./latest-box-variants.module.scss";
import Link from "next/link";
import { GlobalRoutes } from "@/types/consts";
import { ExternalClassnames } from "@/types/components";
import { formatDate } from "@/helpers/date";

type BoxProps = Exclude<ReturnType<typeof getDocBySlugShorten>, undefined>;

const BoxVar1 = (props: BoxProps) => {
  return (
    <div className={classnames("box", styles.shared, styles.variant1)}>
      <div className={styles.variant1Top}>
        <h4 className={styles.variant1TopTitle}>{props.meta.title ?? props.slug.split("/").join(" / ")}</h4>
        <div className={styles.variant1TopSubtitle}>
          {props.meta.date !== undefined && <span>{formatDate(props.meta.date)}</span>}
          {props.meta.TTRmins !== undefined && <span>{props.meta.TTRmins ?? 5}min</span>}
        </div>
      </div>
      <div className={styles.variant1Bottom}>
        {props.meta.tags.map(t => (
          <span>#{t}</span>
        ))}
      </div>
    </div>
  );
};

const BoxVar2 = (props: BoxProps) => {
  return (
    <div className={classnames("box", styles.shared, styles.variant2)}>
      <h4 className={styles.variant2LeftTitle}>{props.meta.title ?? props.slug.split("/").join(" / ")}</h4>
      <div className={styles.variant2Right}>
        <div className={styles.variant2RightTags}>
          {props.meta.tags.map(t => (
            <span>#{t}</span>
          ))}
        </div>
        {props.meta.TTRmins !== undefined && Number(props.meta.TTRmins) > 0 && <span>{props.meta.TTRmins}min</span>}
      </div>
    </div>
  );
};

const BoxVar3 = (props: BoxProps) => {
  return (
    <div className={classnames("box", styles.shared, styles.variant3)}>
      <div className={styles.variant3Top}>
        {props.meta.tags?.length > 0 && <span className={styles.variant3TopTags}>{props.meta.tags.map(t => `#${t}`).join(" ")}</span>}
        {props.meta.TTRmins !== undefined && Number(props.meta.TTRmins) > 0 && <span>{props.meta.TTRmins}min</span>}
      </div>
      <h4 className={styles.variant3BottomTitle}>{props.meta.title ?? props.slug.split("/").join(" / ")}</h4>
    </div>
  );
};

const BoxVar4 = (props: BoxProps) => {
  return (
    <div className={classnames("box", styles.shared, styles.variant3)}>
      <div className={classnames(styles.variant3Top, styles.variant4Top)}>
        <span className={styles.variant3TopTags}>{props.meta.tags.map(t => `#${t}`).join(" ")}</span>
        <span>{props.meta.TTRmins}min</span>
      </div>
      <h4 className={styles.variant3BottomTitle}>{props.meta.title ?? props.slug.split("/").join(" / ")}</h4>
    </div>
  );
};

const variants: ((props: BoxProps) => JSX.Element)[] = [BoxVar1, BoxVar2, BoxVar3, BoxVar4];

export const LatestBox = memo(
  (props: ReturnType<typeof getDocBySlugShorten> & ExternalClassnames) => {
    const variantIdx = Math.floor(Math.random() * variants.length);
    const SelectedVar = variants[variantIdx];
    if (props === undefined) return null;

    return (
      <Link href={`${GlobalRoutes.article}${props.slug}`} className={classnames(styles.wrapper, props.externalClassnames)}>
        <SelectedVar {...props} meta={{ ...props.meta, tags: props.meta.tags.slice(0, 3) ?? [] }} />
      </Link>
    );
  },
  (prev, next) => prev?.slug === next?.slug
);
