import FacebookIcon from "@/assets/icons/FacebookIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import ClotButton from "@/components/clotbutton";
import BackButton from "@/components/common/BackButton";
import ForgetPasswordLInk from "@/components/common/ForgetPasswordLInk";
import SocialAuth from "@/components/common/SocialAuth";
import ClotFormInput from "@/components/inputs/ClotFormInput";
import ClotPasswordInput from "@/components/inputs/ClotPasswordInput";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import { auth, db } from "@/firebaseConfig";
import { signupSchema, SignupSchemaType } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { JSX, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import { View } from "react-native-animatable";
import Toast from "react-native-toast-message";

interface continueWithDataInterface {
  icon: JSX.Element;
  text: string;
}

const Signup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const firebaseErrorMap: Record<
    string,
    { field: "email" | "password"; message: string }
  > = {
    "auth/email-already-in-use": {
      field: "email",
      message: "The email address is already registered.",
    },
    "auth/invalid-email": {
      field: "email",
      message: "The email address is not valid (wrong format).",
    },
    "auth/weak-password": {
      field: "password",
      message: "The password is too weak (less than 6 characters).",
    },
  };

  const continueWithData: continueWithDataInterface[] = [
    {
      icon: <GoogleIcon />,
      text: "Sign Up with Google",
    },
    {
      icon: <FacebookIcon />,
      text: "Sign Up with Facebook",
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
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

  const onSubmit = async (data: SignupSchemaType) => {
    console.log("SUBMIT DATA:", data);
    setLoading(true);
    try {
      // create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      Toast.show({
        type: "success",
        text1: "User Created Successfully",
        text2: userCredential.user.uid,
      });

      console.log(userCredential);

      // create a firestore collection
      // 1. add data object
      const profileData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        userId: userCredential.user.uid,
        onBoardPending: true,
      };

      // 2. Add data to firestore
      await setDoc(
        doc(db, "userProfiles", userCredential.user.uid),
        profileData
      );

      // 3. reset form and route to login screen
      router.push("/onboarding/Login");
      reset();
    } catch (error: any) {
      handleFirebaseError(error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaWrapper
      aboveHeaderText={<BackButton loading={loading} />}
      headerText="Create An Account"
    >
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <View
                style={{ display: "flex", flexDirection: "column", gap: "1" }}
              >
                <ClotFormInput
                  value={value}
                  setValue={onChange}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <Text className="text-red-600">
                    {errors.firstName.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <View
                style={{ display: "flex", flexDirection: "column", gap: "1" }}
              >
                <ClotFormInput
                  value={value}
                  setValue={onChange}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <Text className="text-red-600">
                    {errors.lastName.message}
                  </Text>
                )}
              </View>
            )}
          />

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
                    "The email address is already registered."
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
                    "The password is too weak (less than 6 characters)."
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

          <ClotButton onPress={handleSubmit(onSubmit)}>
            <Text className="text-secondary text-xl font-bold leading-relaxed">
              {loading ? "Loading..." : "Sign Up"}
            </Text>
          </ClotButton>

          <ForgetPasswordLInk loading />
        </View>
        <SocialAuth continueWithData={continueWithData} />
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default Signup;
