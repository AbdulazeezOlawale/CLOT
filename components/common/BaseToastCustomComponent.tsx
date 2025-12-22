import { View } from "react-native";
import React, { JSX } from "react";
import { BaseToast, BaseToastProps } from "react-native-toast-message";

interface BaseToastCustomProps {
  props: BaseToastProps;
  borderColor: string;
  containerBackgroundColor: string;
  iconBackgroundColor: string;
  iconElement: JSX.Element
}

const BaseToastCustomComponent = ({ props, borderColor, containerBackgroundColor, iconBackgroundColor, iconElement}: BaseToastCustomProps) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <BaseToast
        {...props}
        style={{
          width: "100%",
          backgroundColor: containerBackgroundColor,
          marginHorizontal: 0,
          borderLeftWidth: 0,
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          justifyContent: "space-between",
          padding: 10,
        }}
        text1Style={{ fontSize: 17 }}
        text2Style={{ fontSize: 16 }}
        contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
        renderLeadingIcon={() => (
          <View
            style={{
              height: 35,
              width: 35,
              display: "flex",
              backgroundColor: iconBackgroundColor,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: "100%",
            }}
          >
            {iconElement}
          </View>
        )}
      />
    </View>
  );
};

export default BaseToastCustomComponent;
