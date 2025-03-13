"use client";

import { KeybindsScopes } from "@/types/consts";
import { HotkeysProvider } from "react-hotkeys-hook";

export const AppHotkeysWrapper = (props: { children: React.ReactNode }) => {
  return <HotkeysProvider initiallyActiveScopes={[]}>{props.children}</HotkeysProvider>;
};
