import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import HeaderText from "../common/HeaderText";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  edges?: ("top" | "bottom" | "left" | "right")[];
  headerText?: string
}

export function SafeAreaWrapper({
  children,
  edges = ["top", "bottom"],
  headerText
}: SafeAreaWrapperProps) {
  // const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 20,
          backgroundColor: "#FFFFFF",
        }}
        edges={edges}
      >
        <StatusBar style={"dark"} />
        {/* <StatusBar style={colorScheme === "dark" ? "light" : "dark"} /> */}
        <View className="flex flex-col gap-10">
          {headerText &&<HeaderText headerText={headerText} />}
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
