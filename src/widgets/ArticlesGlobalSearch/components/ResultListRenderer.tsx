import classnames from "classnames";
import { ArticleListElementProps } from "@/types/articles";
import styles from "./result-list-renderer.module.scss";
import classNames from "classnames";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/Generic/Buttons/Default/Default-Button";
import { Icon } from "@/components/Generic/Icon";
import Link from "next/link";

type ResultListRenderProps = {
  list: ArticleListElementProps[];
  searchedPhrase: string;
};

const _renderListVariant = ["blocks", "rows"] as const;

export const ResultListRenderer = ({ list, searchedPhrase }: ResultListRenderProps) => {
  const [renderListVariant, setRenderVariant] = useState<number>(0);
  const cycleVariant = () => {
    setRenderVariant(currIdx => (currIdx + 1) % _renderListVariant.length);
  };

  /**
   * takes in account only first phrase match
   * @example
   * ```ts
   * selectTextExample(100, "In at mi faucibus, interdum ipsum sit amet, cursus quam. Cras purus lacus, vulputate ac tempor sed, imperdiet quis risus. Maecenas posuere dapibus egestas. In vel tincidunt libero. Etiam non scelerisque est, et tempor purus.", "sit amet")
   * ```
   * @returns truncated to words limit text (or not truncated if error occurs) from found word
   */
  //   const selectTextExample = (symbolsLimit: number, text?: string, phrase?: string) => {
  //     const returnObj = {
  //       text,
  //       phrase
  //     };
  //     if (!text?.trim() || !phrase?.trim()) return returnObj;
  //     const halfLimit = Math.floor(symbolsLimit / 2);

  //     // search for phrase
  //     // divide its length, get left words bound (i.e. halfLimit is 50, minus half of phrase (4symb) is 50-4=46, then from phrase match index (60 i.e.) + half of its length (4) = 60+4=64, minus half length = 64-50=14, thats starting index of slicing textPreview, check next line)
  //     // main issue is diving odd lenght like 7, 3 on left and 4 on right
  //   };

  // useCallback(
  // пока не работает
  const highlightPhrase = (text?: string, phrase?: string) => {
    if (!text?.trim() || !phrase?.trim()) return text;
    phrase = phrase.trim();
    text = text.trim();

    const regexp = new RegExp("/(^|[.!?]s+)" + phrase + "\b.*?(?=[.!?](s|$))[.!?]/");
    //   const regexp = new RegExp(/\/interdum ipsum\/gi/gi)
    // console.log(regexp);
    console.log({ regexp });
    const parts = text.split(regexp);
    console.log({ parts });
    return (
      <span>{parts.filter(parts => parts).map((part, i) => (regexp.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}</span>
    );
  };

  return (
    <div className={classnames(styles.resultListRenderer)}>
      <div className={classnames(styles.top)}>
        <span>[results] {list.length} found</span>
        <Button onClick={cycleVariant} externalClassnames={styles.button}>
          <Icon icon={`grid-${_renderListVariant[renderListVariant]}`} />
        </Button>
      </div>
      <ul className={classNames(styles.list, styles[`${_renderListVariant[renderListVariant]}Grid`])}>
        {list.map(article => (
          <li className={styles.elementWrapper}>
            <Link href={article.href} className={styles.element}>
              <div className={styles.title}>
                {article.category && <Icon icon={article.category} />}
                &#91;<p>{article.title}</p>&#93;
              </div>
              <p className={styles.text}>{highlightPhrase(article.textPreview, searchedPhrase)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
