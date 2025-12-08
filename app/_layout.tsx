import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";


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
  }, [])

  if (!isReady) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="launch" options={{title: "Launch", headerShown: false}}/>
      <Stack.Screen name="index" options={{title: "Index", headerShown: false}} />
      <Stack.Screen name="welcome" options={{title: "Welcome"}} />
      <Stack.Screen name="onboarding" options={{title: "Onboarding", headerShown: false}}/>
    </Stack>
  );
}
