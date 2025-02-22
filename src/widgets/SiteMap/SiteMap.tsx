"use client";
// наверное client, пока хз, модалка ведь. можно и немодальную версию страницы сделать

import { useImperativeHandle, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import classnames from "classnames";
import styles from "./site-map.module.scss";
import { PageTree } from "./types";
import { Tree } from "./components/TreeRender";
import dynamic from "next/dynamic";
import { GlobalRoutes } from "@/types/articles";
const Modal = dynamic(() => import("../../components/Generic/Modal").then(m => m.Modal), { ssr: false });

const pages: PageTree[] = [
  {
    href: GlobalRoutes.home,
    label: "/home"
  },
  // {
  //   href: "/tech-articles",
  //   label: "/tech-articles",
  //   children: [
  //     {
  //       href: "/article/*",
  //       label: "/article/*",
  //       noLink: true
  //     }
  //   ]
  // },
  {
    href: GlobalRoutes.articles,
    label: "/articles/"
  },
  {
    href: GlobalRoutes.article,
    label: "/article/",
    children: [
      {
        href: "[id]/",
        label: "[id]/",
        noLink: true
      }
    ]
  },
  {
    href: GlobalRoutes.blog,
    label: "/blog/",
    children: [
      {
        href: "[id]/",
        label: "[id]/",
        noLink: true
      }
    ]
  },
  {
    href: GlobalRoutes.project,
    label: "/proejct/",
    children: [
      {
        href: "[id]/",
        label: "[id]/",
        noLink: true
      }
    ]
  }
];

export type SiteMapRef = {
  setModalState: (open: boolean) => void;
};

export const SiteMap = ({ ref }: { ref?: React.Ref<SiteMapRef> }) => {
  // MODAL CONTROLS & STATE START
  const [modalOpen, setModalOpen] = useState(false);
  const onClose = () => setModalOpen(false);
  useHotkeys("ctrl+m", () => setModalOpen(true), { enabled: true, preventDefault: true }, []);

  // на случай неободимости открыть окно, например, в туториале
  useImperativeHandle(ref, () => ({
    setModalState: setModalOpen
  }));
  // MODAL CONTROLS & STATE END

  return (
    <Modal ariaLabel='site map modal' onClose={onClose} show={modalOpen} externalClassnames={styles.modal} hideCloseBtn>
      <div className={classnames("box", styles.siteMap)}>
        <h2 className={styles.title}>Site map</h2>
        <Tree treeData={pages} prevPath='' />
      </div>
    </Modal>
  );
};
