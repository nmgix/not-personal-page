import { useImperativeHandle, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { ArticlesGlobalSearchRef } from "../ArticlesGlobalSearch";
import { KeybindsScopes } from "@/types/consts";

export const useModal = (ref: React.Ref<ArticlesGlobalSearchRef> | undefined) => {
  const [modalOpen, setModalOpen] = useState(false);
  const onClose = () => setModalOpen(false);
  useHotkeys("ctrl+k", () => setModalOpen(prev => !prev), { preventDefault: true, scopes: [KeybindsScopes.globalSearch] });
  // на случай неободимости открыть окно, например, в туториале
  useImperativeHandle(ref, () => ({
    setModalState: setModalOpen
  }));

  return { modalOpen, setModalOpen, onClose };
};
