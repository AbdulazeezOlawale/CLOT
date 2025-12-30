import React from "react";
import ClotPressable from "../common/ClotPressable";
import { ClotButtonProps } from "@/types/schema";

const ClotButton = (props: ClotButtonProps) => {
  return (
    <ClotPressable
      {...props}
      classname={`bg-primary rounded-full overflow-hidden flex items-center justify-center ${props.classname}`}
    >
      {props.children}
    </ClotPressable>
  );
};

export default ClotButton;
