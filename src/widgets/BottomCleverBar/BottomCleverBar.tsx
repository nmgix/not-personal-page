import classnames from "classnames";
import styles from "./bottom-clever-bar.module.scss";

export const BottomCleverBar = () => {
  return (
    <div className={styles.bottomCleverBar}>
      <div className={classnames("box", styles.controls)}></div>
      <div className={classnames("box", styles.devName)}>{process.env.NEXT_PUBLIC_NAME}</div>
    </div>
  );
};
