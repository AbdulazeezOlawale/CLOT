import { StickyLayoutContextType } from "@/types/schema";
import React, {
  createContext,
  useState,
} from "react";


export const StickyLayoutContext = createContext<
  StickyLayoutContextType | undefined
>(undefined);

const StickyHeightProvider = ({ children }: { children: React.ReactNode }) => {
  const [stickyHeight, setStickyHeight] = useState(0);

  return (
    <StickyLayoutContext.Provider value={{ stickyHeight, setStickyHeight }}>
      {children}
    </StickyLayoutContext.Provider>
  );
};

export default StickyHeightProvider;
