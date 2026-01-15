import BaseToastCustomComponent from "@/components/common/BaseToastCustomComponent";
import { auth } from "@/firebaseConfig";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { Check, CircleAlert, TriangleAlert, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { BaseToastProps } from "react-native-toast-message";

export default function RootLayout() {
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const router = useRouter();

  // wait for the splash screen animation to end
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationDone(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // unsubscribe from firebase state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Only navigate if BOTH the auth is loaded AND the animation is finished
      if (isAuthLoaded && isAnimationDone) {
        if (!user) {
          router.replace("/onboarding/Login");
        } else {
          router.replace("/(home)/HomePage");
        }
      }
      setIsAuthLoaded(true);
    });

    return () => unsubscribe();
  }, [isAuthLoaded, isAnimationDone, router]);

  if (!isAuthLoaded) {
    return null;
  }

  // custom success toast
  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToastCustomComponent
        props={props}
        borderColor="#60B17A"
        containerBackgroundColor="#F1F9F4"
        iconBackgroundColor="#4DDA69"
        iconElement={<Check size={20} color="white" />}
      />
    ),
    error: (props: BaseToastProps) => (
      <BaseToastCustomComponent
        props={props}
        borderColor="#A84B49"
        containerBackgroundColor="#FCEFEA"
        iconBackgroundColor="#F95B57"
        iconElement={<X size={20} color="white" />}
      />
    ),
    warning: (props: BaseToastProps) => (
      <BaseToastCustomComponent
        props={props}
        borderColor="#D6B55C"
        containerBackgroundColor="#FEF7EA"
        iconBackgroundColor="#FFBE22"
        iconElement={<TriangleAlert size={20} color="white" />}
      />
    ),
    info: (props: BaseToastProps) => (
      <BaseToastCustomComponent
        props={props}
        borderColor="#538ACF"
        containerBackgroundColor="#E7EEFA"
        iconBackgroundColor="#3389EA"
        iconElement={<CircleAlert size={20} color="white" />}
      />
    ),
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name="launch"
            options={{ title: "Launch", headerShown: false }}
          />
          <Stack.Screen
            name="onboarding"
            options={{ title: "Onboarding", headerShown: false }}
          />
          <Stack.Screen
            name="(home)"
            options={{ title: "home", headerShown: false }}
          />
        </Stack>
      </BottomSheetModalProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
