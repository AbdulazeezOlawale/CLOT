import { StickyLayoutContext } from "@/context/StickyHeightProvider"
import { StickyLayoutContextType } from "@/types/schema"
import { useContext } from "react"

export const useStickyLayout = () => {
    const context = useContext<StickyLayoutContextType | undefined>(StickyLayoutContext);

    if (context === undefined) {
      throw new Error(
        "useStickyLayout must be used within a StickyHeightProvider"
      );
    }

    return context;
}