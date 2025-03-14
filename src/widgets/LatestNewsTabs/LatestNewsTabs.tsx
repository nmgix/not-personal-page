import classnames from "classnames";
import styles from "./latest-news-tabs.module.scss";
import { ExternalClassnames } from "@/types/components";
import { LatestBox } from "@/app/articles/components/latest-box/LatestBox";
import { getDocBySlugShorten, getLatestDocs } from "@/serverfunctions/getDoc";

type LastetNewsTabsProps = {} & ExternalClassnames;

export const LatestNewsTabs = ({ externalClassnames }: LastetNewsTabsProps) => {
  const latestPosts = getLatestDocs(5)
    .map(d => {
      const [category, slug] = d.file.split("/");
      return getDocBySlugShorten(category, slug);
    })
    .filter(p => !!p);

  return (
    <div className={classnames(styles.latestNewsTabs, externalClassnames)}>
      {latestPosts.map((p, idx) => (
        <LatestBox {...p} externalClassnames={idx < 2 ? styles.firstRowItem : styles.secondRowItem} />
      ))}
    </div>
  );
};
