import { View } from "react-native";
import React, { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";

const Launch = () => {
  const backgroundRef = useRef<any>(null);
  const logoRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (backgroundRef.current && logoRef.current) {
        Promise.all([
          backgroundRef.current.fadeOut(500),
          logoRef.current.fadeOut(500),
        ]).then(() => {
          // if user is authenticated route to the main screen else route to the auth screen
          getAuth().onAuthStateChanged((user) => {
            if (!user) {
              router.replace("/onboarding/Login");
            } else {
              router.replace("/(home)/HomePage");
            }
          });
        });
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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
};

export default Launch;
