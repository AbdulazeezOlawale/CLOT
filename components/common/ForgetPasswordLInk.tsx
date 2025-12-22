import { View, Text, Pressable } from "react-native";
import React from "react";

const ForgetPasswordLInk = ({loading}: {loading?: boolean}) => {
  return (
    <View className="flex flex-row gap-1 items-center">
      <Text className="text-lg">Forgot Password?</Text>
      <Pressable>
        <Text className="text-lg font-bold text-primary ">Reset</Text>
      </Pressable>
    </View>
  );
};

export default ForgetPasswordLInk;
