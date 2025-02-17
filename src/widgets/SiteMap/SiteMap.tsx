"use client";
// наверное client, пока хз, модалка ведь. можно и немодальную версию страницы сделать

import { useImperativeHandle, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import classnames from "classnames";
import { Modal } from "@/components/Generic/Modal";
import styles from "./site-map.module.scss";
import { PageTree } from "./types";
import { Tree } from "./components/TreeRender";

const pages: PageTree[] = [
  {
    href: "/home",
    label: "/home"
  },
  {
    href: "/tech-articles",
    label: "/tech-articles",
    children: [
      {
        href: "/article/*",
        label: "/article/*",
        noLink: true
      }
    ]
  },
  {
    href: "/blog",
    label: "/blog",
    children: [
      {
        href: "/article/*",
        label: "/article/*",
        noLink: true
      }
    ]
  },
  {
    href: "/projects",
    label: "/projects",
    children: [
      {
        href: "/article/*",
        label: "/article/*",
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
