// probably not client sided
//  some kindof once-a-day update of content, same like cron or on page request with update once-a-day by demand i meant

import classnames from "classnames";
import styles from "./latest-news-tabs.module.scss";

type LastetNewsTabsProps = {
  externalClassnames?: string | string[];
};

export const LatestNewsTabs = ({ externalClassnames }: LastetNewsTabsProps) => {
  return (
    <div className={classnames(styles.latestNewsTabs, externalClassnames)}>
      <div className={classnames("box", styles.firstRowItem)}>news 1</div>
      <div className={classnames("box", styles.firstRowItem)}>news 2</div>
      <div className={classnames("box", styles.secondRowItem)}>news 3</div>
      <div className={classnames("box", styles.secondRowItem)}>news 3</div>
      <div className={classnames("box", styles.secondRowItem)}>news 3</div>
    </div>
  );
};
