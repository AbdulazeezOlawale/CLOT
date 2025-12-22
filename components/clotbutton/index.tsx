import { Text } from "react-native";
import React from "react";
import ClotPressable from "../common/ClotPressable";

interface ClotButtonProps {
  buttonText: string;
  onPress?: () => void;
}

const ClotButton = ({ buttonText, onPress }: ClotButtonProps) => {
  return (
    <ClotPressable
      onPress={() => onPress?.()}
      classname="px-6 py-3 bg-primary rounded-full overflow-hidden flex items-center justify-center"
    >
      <Text className="text-secondary text-xl font-bold leading-relaxed">
        {buttonText}
      </Text>
    </ClotPressable>
  );
};

export default ClotButton;
