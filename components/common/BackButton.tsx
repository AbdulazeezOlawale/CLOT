import React from "react";
import BackIcon from "@/assets/icons/BackIcon";
import ClotPressable from "./ClotPressable";
import { useRouter } from "expo-router";

const BackButton = ({loading}: {loading?: boolean}) => {
  const router = useRouter();
  
  const onPress = () => {
    !loading && router.push("/onboarding/Login");
  };

  return (
    <ClotPressable
      onPress={onPress}
      classname="size-11 rounded-full bg-secondary flex items-center justify-center overflow-hidden"
    >
      <BackIcon />
    </ClotPressable>
  );
};

export default BackButton;
