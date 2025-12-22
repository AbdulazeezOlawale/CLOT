import { Pressable } from "react-native";
import React from "react";

interface ClotPressableProps {
  onPress: () => void;
  classname?: string;
  children: React.ReactNode;
}

const ClotPressable = ({
  onPress,
  classname,
  children,
}: ClotPressableProps) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: "#00000020",
        radius: 200,
        foreground: true,
      }}
      className={`${classname}`}
    >
      {children}
    </Pressable>
  );
};

export default ClotPressable;
