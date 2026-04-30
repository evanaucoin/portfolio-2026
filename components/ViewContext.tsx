"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type View = "home" | "dzd" | "prism";

interface ViewContextType {
  view: View;
  setView: (v: View) => void;
}

const ViewContext = createContext<ViewContextType>({
  view: "home",
  setView: () => {},
});

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>("home");
  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}
