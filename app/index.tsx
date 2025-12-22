import { useEffect } from "react";
import "./global.css";
import { Image, View } from "react-native";
import { useRouter } from "expo-router";

export default function App() {
  
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding/Login")
    }, 3000);

    return () => clearTimeout(timer);
  }, [])

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Image source={require("../assets/images/splashlogo.png")}/>
    </View>
  );
}