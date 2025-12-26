import BaseToastCustomComponent from "@/components/common/BaseToastCustomComponent";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Check, CircleAlert, TriangleAlert, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import Toast, {
  BaseToastProps,
} from "react-native-toast-message";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
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
    <>
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
      <Toast config={toastConfig} />
    </>
  );
}
