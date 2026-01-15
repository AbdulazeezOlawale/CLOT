import styles from "@/app/styles";
import SearchIcon from "@/assets/icons/SearchIcon";
import { ShoppingCartIcon } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import ClotButton from "../clotbutton";
import ClotPressable from "./ClotPressable";
import { useStickyLayout } from "@/hooks/useStickyLayout";

const ProductListHeader = () => {
  const { setStickyHeight } = useStickyLayout();

  return (
    <View
      className="py-2 px-[10]"
      style={styles.sticky}
      onLayout={(e) => setStickyHeight(e.nativeEvent.layout.height)}
    >
      <View className="flex flex-row flex-1 items-center justify-between gap-2">
        <ClotPressable
          onPress={() => console.log("avatar")}
          classname="size-10 rounded-full overflow-hidden"
        >
          <Image
            source={require("@/assets/images/avatar.jpg")}
            className="size-full"
          />
        </ClotPressable>

        <ClotPressable
          onPress={() => console.log("search")}
          classname="bg-secondary h-10  rounded-full flex flex-row items-center align-middle gap-2 pl-4 overflow-hidden flex-1 border"
        >
          <SearchIcon />
          <Text className="text-lg">Search</Text>
        </ClotPressable>

        <ClotButton classname="size-10">
          <ShoppingCartIcon color={"white"} size={16} />
        </ClotButton>
      </View>
    </View>
  );
};

export default ProductListHeader;
