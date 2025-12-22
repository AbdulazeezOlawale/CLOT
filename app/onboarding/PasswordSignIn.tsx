import { Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import ClotButton from "@/components/clotbutton";
import { router } from "expo-router";
import ClotPasswordInput from "@/components/inputs/ClotPasswordInput";
import ForgetPasswordLInk from "@/components/common/ForgetPasswordLInk";

const PasswordSignIn = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordValidationError, setPasswordValidationError] =
    useState<string>("");

  const handlePasswordValidation = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.trim().length === 0) {
      setPasswordValidationError("Password is required");
    } else if (!passwordRegex.test(password)) {
      setPasswordValidationError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordValidationError("");
      router.push("/onboarding/Login");
    }
  };

  return (
    <SafeAreaWrapper headerText="Sign in">
      <View className="flex-gap-3">
        <View>
          <ClotPasswordInput value={password} setValue={setPassword}/>
          <Text className="text-red-500">{passwordValidationError}</Text>
        </View>

        <ClotButton buttonText="Continue" onPress={handlePasswordValidation} />

        <ForgetPasswordLInk/>
      </View>
    </SafeAreaWrapper>
  );
};

export default PasswordSignIn;
