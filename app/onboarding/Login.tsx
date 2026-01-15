import FacebookIcon from "@/assets/icons/FacebookIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import ClotButton from "@/components/clotbutton";
import SocialAuth from "@/components/common/SocialAuth";
import ClotFormInput from "@/components/inputs/ClotFormInput";
import ClotPasswordInput from "@/components/inputs/ClotPasswordInput";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import { auth, db } from "@/firebaseConfig";
import {
  continueWithDataInterface,
  loginSchema,
  LoginSchemaType,
} from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const firebaseErrorMap: Record<
    string,
    { field: "email" | "password"; message: string }
  > = {
    "auth/invalid-email": {
      field: "email",
      message: "The email address is not valid (wrong format).",
    },
    "auth/user-disabled": {
      field: "email",
      message: "The user account has been disabled.",
    },
    "auth/user-not-found": {
      field: "email",
      message: "No user exists with this email address.",
    },
    "auth/wrong-password": {
      field: "password",
      message: "Password is incorrect for this email.",
    },
    "auth/invalid-credential": {
      field: "password",
      message: "Incorrect email or password.",
    },
  };

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // mapping the error key to the value
  const handleFirebaseError = (code: string) => {
    const err = firebaseErrorMap[code];

    if (err) {
      if (
        err.message === "The password is too weak (less than 6 characters)."
      ) {
        Toast.show({
          type: "error",
          text1: err.message,
          text2: code,
        });
      } else {
        Toast.show({
          type: "error",
          text1: err.message,
          text2: code,
        });
      }
      setError(err.field, {
        type: "server",
        message: err.message,
      });
    }
  };

  const onSubmit = async (data: LoginSchemaType) => {
    console.log(data);
    setLoading(true);

    try {
      // log user in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log(userCredential);

      await new Promise<void>((resolve) => {

      })

      const userDocRef = doc(db, "userProfiles", userCredential.user.uid);
      await updateDoc(userDocRef, {
        updatedAt: new Date().getTime(),
      });

      Toast.show({
        type: "success",
        text1: "User Logged In Successfully",
        text2: userCredential.user.uid,
      });

      router.replace("/(home)/HomePage");

      reset();
    } catch (error: any) {
      handleFirebaseError(error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaWrapper headerText="Sign in">
      <View className="flex gap-6">
        <View className="flex-gap-3">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View
                style={{ display: "flex", flexDirection: "column", gap: "1" }}
              >
                <ClotFormInput
                  value={value}
                  setValue={onChange}
                  placeholder="Email (e.g. name@example.com)"
                  classname={
                    errors.email?.message ===
                      "The email address is not valid (wrong format)." ||
                    errors.email?.message ===
                      "The user account has been disabled." ||
                    errors.email?.message ===
                      "No user exists with this email address."
                      ? "border border-red-400"
                      : ""
                  }
                />
                <>
                  {errors.email && (
                    <Text className="text-red-600">{errors.email.message}</Text>
                  )}
                </>
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View
                style={{ display: "flex", flexDirection: "column", gap: "1" }}
              >
                <ClotPasswordInput
                  value={value}
                  setValue={onChange}
                  placeholder="Password"
                  classname={
                    errors.password?.message ===
                    "Password is incorrect for this email."
                      ? "border border-red-400"
                      : ""
                  }
                />
                {errors.password && (
                  <Text className="text-red-600">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />

          <ClotButton onPress={handleSubmit(onSubmit)} classname="py-3">
            <Text className="text-secondary text-xl font-bold leading-relaxed">
              {loading ? "Loading..." : "Sign Up"}
            </Text>
          </ClotButton>
        </View>

        <View className="flex flex-row gap-1 items-center">
          <Text className="text-lg">Don&apos;t have an Account?</Text>
          <Pressable onPressIn={navigateToSignUp}>
            <Text className="text-lg font-bold text-primary ">Create one</Text>
          </Pressable>
        </View>
      </View>

      <SocialAuth continueWithData={continueWithData} />
    </SafeAreaWrapper>
  );
};

export default Login;
