import { useEffect, useRef } from "react";
import "./global.css";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import * as Animatable from "react-native-animatable";

export default function App() {
  const backgroundRef = useRef<any>(null);
  const logoRef = useRef<any>(null);
  const router = useRouter();

  // wait for the splash screen animation to finish then check if the user is logged in or not to route to the appropriate screen
  useEffect(() => {
    const handleNavigation = setTimeout(async () => {
      if (backgroundRef.current && logoRef.current) {
        const refs = [
          backgroundRef.current.fadeOut(500),
          logoRef.current.fadeOut(500),
        ];
        await Promise.all(refs);

        const user = await new Promise((resolve) => {
          const unsubscribe = getAuth().onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
          });
        });

        if (!user) {
          router.replace("/onboarding/Login");
        } else {
          router.replace("/(home)/HomePage");
        }
      }
    }, 4000);

    return () => clearTimeout(handleNavigation);
  }, [router]);

  return (
    <View className="flex-1">
      <Animatable.Image
        animation="fadeIn"
        duration={1000}
        className="w-full h-full flex-1 items-center justify-center bg-primary"
        style={{ resizeMode: "cover" }}
        ref={backgroundRef}
      />

      <View className="absolute inset-0 justify-center items-center">
        <Animatable.Image
          animation="zoomIn"
          duration={4000}
          source={require("../assets/images/splashscreenlogo.png")}
          style={{ width: 300, height: 200 }}
          resizeMode="contain"
          ref={logoRef}
        />
      </View>
    </View>
  );
}