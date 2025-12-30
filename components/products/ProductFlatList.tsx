import { View, Text, Image } from "react-native";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Product } from "@/types/schema";
import ClotButton from "../clotbutton";

interface ProductFlatListProps {
  productItem: Product;
  onOpen: () => void;
  onClose: () => void;
  setCurrentProductItemId: Dispatch<SetStateAction<string>>;

  onActiveOrder: (productItem: Product) => void;
}

const ProductFlatList = ({
  productItem,
  onActiveOrder
}: ProductFlatListProps) => {
  return (
    <View className="bg-secondary rounded-lg shadow-sm p-2 gap-2">
      <View className="w-48 h-36 bg-[#e9eaec] rounded-md">
        <Image
          source={{ uri: productItem.image }}
          className="size-full"
          resizeMode="cover"
        />
      </View>

      <View>
        <Text className="font-bold text-lg">{productItem.title}</Text>
        <Text>${productItem.price}</Text>
      </View>

      <View className="flex flex-row items-center justify-between gap-2">
        <ClotButton classname="!bg-[#e9eaec] flex-1 py-2.5 !rounded-md">
          <Text className="font-semibold">Add to Cart</Text>
        </ClotButton>
        <ClotButton classname=" flex-1 py-2.5 !rounded-md" onPress={() => onActiveOrder(productItem)}>
          <Text className="text-white font-semibold">Order Item</Text>
        </ClotButton>
      </View>
    </View>
  );
};

export default memo(ProductFlatList);
