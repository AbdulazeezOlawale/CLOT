import { continueWithDataInterface } from "@/types/schema";
import React from "react";
import { Text, View } from "react-native";
import CommonButton from "./CommonButton";

interface SocialAuthProps {
  continueWithData: continueWithDataInterface[];
}

const SocialAuth = ({ continueWithData }: SocialAuthProps) => {
  return (
    <View className="flex flex-col gap-4">
      {continueWithData.map(
        (item: continueWithDataInterface, index: number) => (
          <CommonButton
            classNameStyle="rounded-full flex flex-row items-center"
            key={index}
          >
            <View className="justify-center items-center">{item.icon}</View>
            <Text className="flex text-center flex-1 text-xl font-semibold">
              {item.text}
            </Text>
          </CommonButton>
        )
      )}
    </View>
  );
};

export default SocialAuth;
