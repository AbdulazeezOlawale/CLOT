import { Pressable } from "react-native";
import React from "react";
import { ClotButtonProps } from "@/types/schema";


const ClotPressable = ({
  onPress,
  classname,
  children,
  disabled
}: ClotButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: "#00000020",
        radius: 200,
        foreground: true,
      }}
      className={`${classname}`}
      disabled={disabled}
    >
      {children}
    </Pressable>
  );
};

export default ClotPressable;
