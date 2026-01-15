import { View, Text, RefreshControl, ActivityIndicator } from "react-native";
import React from "react";
import { loadMoreItems } from "@/services/productService";
import ProductFlatList from "./ProductFlatList";
import { loadingMoreItemsProps, Product } from "@/types/schema";
import CustomFlatList from "./CustomFlatList";
import ProductListHeader from "../common/ProductListHeader";
import { useStickyLayout } from "@/hooks/useStickyLayout";

interface flatListProductCatalogueProps extends loadingMoreItemsProps {
  reels: Product[];
  sheetOpen: boolean;
  refreshing: boolean;
  onRefresh: VoidFunction;
  dismissBottomSheet: VoidFunction;
  presentBottomSheet: VoidFunction;
  setCurrentProductItemId: React.Dispatch<React.SetStateAction<string>>;
  handleActiveOrder: (productItem: Product) => void;
  tabBarHeight: number;
}

const FlatListProductCatalogue = (props: flatListProductCatalogueProps) => {
  const {
    dismissBottomSheet,
    reels,
    sheetOpen,
    hasMore,
    loadingMore,
    refreshing,
    setHasMore,
    setLastVisible,
    setLoadingMore,
    setReels,
    loadItemsDispatch,
    lastVisible,
    limitCount,
    onRefresh,
    presentBottomSheet,
    setCurrentProductItemId,
    handleActiveOrder,
    tabBarHeight,
  } = props;

  const { stickyHeight } = useStickyLayout();

  return (
    <CustomFlatList
      data={reels}
      keyExtractor={(item) => item.productCode}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Text>Loading...</Text>}
      numColumns={2}
      onEndReached={
        sheetOpen
          ? null
          : () =>
              loadMoreItems({
                hasMore,
                lastVisible,
                limitCount,
                loadingMore,
                setHasMore,
                setLastVisible,
                setLoadingMore,
                setReels,
                loadItemsDispatch,
              })
      }
      onEndReachedThreshold={0.5}
      refreshControl={
        sheetOpen ? undefined : (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        )
      }
      renderItem={({ item }) => (
        <ProductFlatList
          productItem={item}
          onClose={dismissBottomSheet}
          onOpen={presentBottomSheet}
          setCurrentProductItemId={setCurrentProductItemId}
          onActiveOrder={handleActiveOrder}
        />
      )}
      ListFooterComponent={
        hasMore && reels.length > 0 ? (
          <View className="pt-4">
            <ActivityIndicator color="#8E6CEF" />
          </View>
        ) : null
      }
      columnWrapperStyle={{
        display: "flex",
        justifyContent: "space-between",
        gap: 8,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={{
        paddingBottom: tabBarHeight + 76,
        marginTop: stickyHeight + 16,
        paddingHorizontal: 10,
      }}
      StickyElementComponent={<ProductListHeader />}
    />
  );
};

export default FlatListProductCatalogue;
