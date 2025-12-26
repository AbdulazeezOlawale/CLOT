import { Text } from "react-native";
import React from "react";
import ClotPressable from "../common/ClotPressable";

interface ClotButtonProps {
  onPress?: () => void;
  classname?: string;
  children: React.ReactElement;
}

const ClotButton = ({ children, onPress, classname }: ClotButtonProps) => {
  return (
    <ClotPressable
      onPress={() => onPress?.()}
      classname={`bg-primary rounded-full overflow-hidden flex items-center justify-center ${classname}`}
    >
      {children}
    </ClotPressable>
  );
};

export default ClotButton;
