import { View } from "react-native";
import React, { useState } from "react";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import ClotFormInput from "@/components/inputs/ClotFormInput";
import { Eye, EyeClosed } from "lucide-react-native";
import ClotPressable from "@/components/common/ClotPressable";

const PasswordSignIn = () => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaWrapper headerText="Sign in">
      <View className="flex flex-row gap-1 items-center bg-secondary rounded-md overflow-hidden">
        <View className="flex-1">
          <ClotFormInput
            keyboardType="default"
            autoComplete="password"
            placeholder="Enter your password"
            value={password}
            setValue={setPassword}
            secureTextEntry={showPassword}
          />
        </View>

        <ClotPressable
          onPress={toggleVisibility}
          classname="p-4 flex items-center align-middle"
        >
          {showPassword ? (
            <Eye size={20} className="flex items-center justify-center" />
          ) : (
            <EyeClosed size={20} className="flex items-center justify-center" />
          )}
        </ClotPressable>
      </View>
    </SafeAreaWrapper>
  );
};

export default PasswordSignIn;