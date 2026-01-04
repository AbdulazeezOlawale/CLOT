import { View, Text, Image } from 'react-native'
import React, { RefObject } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Product } from '@/types/schema';
import ClotButton from '../clotbutton';

interface bottomSheetComponentProps {
  bottomSheetModalRef: RefObject<BottomSheetModal | null>;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productToOrder: Product | undefined;
  dismissBottomSheet: VoidFunction;
  decrementOrderUnit: VoidFunction;
  incrementOrderUnit: VoidFunction;
  unitCount: number;
  addProductToOrderList: (productItem: Product) => void;
  totalPrice: string;
}

const BottomSheetComponent = (props: bottomSheetComponentProps) => {

  const {
    bottomSheetModalRef,
    setSheetOpen,
    productToOrder,
    dismissBottomSheet,
    decrementOrderUnit,
    incrementOrderUnit,
    unitCount,
    addProductToOrderList,
    totalPrice,
  } = props;

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          style={{ backgroundColor: "#1A1C1E66" }}
        />
      )}
      enableDismissOnClose
      enableDynamicSizing
      enablePanDownToClose
      index={0}
      onChange={(index) => {
        setSheetOpen(index >= 0);
      }}
      onDismiss={() => setSheetOpen(false)}
    >
      <BottomSheetView>
        <View>
          <Image
            source={{ uri: productToOrder?.image }}
            resizeMode="cover"
            className="w-full pb-64 -translate-y-12"
          />
        </View>

        <View className="-translate-y-6 px-4 flex flex-col gap-1.5 pb-28">
          <Text onPress={dismissBottomSheet} className="font-semibold text-lg">
            {productToOrder?.title}
          </Text>
          <Text>{productToOrder?.subTitle}</Text>
          <Text className="font-semibold">${productToOrder?.price}</Text>
        </View>

        <View className="absolute bottom-0 left-0 right-0 px-4 py-6 border-t-[1px] border-[#E5E7EB] bg-white">
          <View className="flex-row items-center gap-3">
            {/* Quantity */}
            <View className="flex-row items-center border border-primary rounded-lg px-3 py-5 gap-2">
              <Text
                className="text-primary font-semibold text-2xl px-2.5"
                onPress={decrementOrderUnit}
              >
                -
              </Text>
              <Text className="text-primary mx-4 font-bold text-2xl">
                {unitCount}
              </Text>
              <Text
                className="text-primary font-semibold text-2xl px-2.5"
                onPress={incrementOrderUnit}
              >
                +
              </Text>
            </View>

            {/* preorder item */}
            <ClotButton
              classname="flex-1 py-5 rounded-lg items-center"
              onPress={() =>
                productToOrder && addProductToOrderList(productToOrder)
              }
            >
              <Text className="text-white font-semibold text-2xl w-full text-center">
                Add ${totalPrice}
              </Text>
            </ClotButton>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheetComponent