import React, { JSX, useState } from "react";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import { Pressable, Text, View } from "react-native";
import ClotFormInput from "@/components/inputs/ClotFormInput";
import ClotButton from "@/components/clotbutton";
import { router } from "expo-router";
import CommonButton from "@/components/common/CommonButton";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";

interface continueWithDataInterface {
  icon: JSX.Element;
  text: string;
}

const Login = () => {

  const [email, setEmail] = useState<string>("")
  const [emailValidationError, setEmailValidationError] = useState<string>("")

  const navigateToSignUp = () => {
    router.push("/onboarding/Signup");
  };

  const continueWithData: continueWithDataInterface[] = [
    {
      icon: <GoogleIcon />,
      text: "Login with Google",
    },
    {
      icon: <FacebookIcon />,
      text: "Login with Facebook",
    },
  ];

  const validateEmailField = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length === 0) {
      setEmailValidationError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailValidationError("Invalid email format");
    } else{
      setEmailValidationError("");
      router.push('/onboarding/PasswordSignIn')
    }
  }

  return (
    <SafeAreaWrapper headerText="Sign in">
      <View className="flex gap-6">
        <View className="flex gap-6">
          <View className="flex gap-1">
            <ClotFormInput
              autoComplete="email"
              placeholder="Email Address"
              value={email}
              setValue={setEmail}
              keyboardType="email-address"
            />
            <Text className="text-red-500">{emailValidationError}</Text>
          </View>
          <ClotButton buttonText="Continue" onPress={validateEmailField} />
        </View>

        <View className="flex flex-row gap-1 items-center">
          <Text className="text-lg">Don&apos;t have an Account?</Text>
          <Pressable onPressIn={navigateToSignUp}>
            <Text className="text-lg font-bold text-primary ">Create one</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex flex-col gap-4">
        {continueWithData.map((item, index) => (
          <CommonButton
            classNameStyle="rounded-full flex flex-row items-center"
            key={index}
          >
            <View className="justify-center items-center">{item.icon}</View>
            <Text className="flex text-center flex-1 text-xl font-semibold">
              {item.text}
            </Text>
          </CommonButton>
        ))}
      </View>
    </SafeAreaWrapper>
  );
};

export default Login;
