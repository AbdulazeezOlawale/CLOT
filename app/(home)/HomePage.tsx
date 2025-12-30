import SearchIcon from "@/assets/icons/SearchIcon";
import ClotButton from "@/components/clotbutton";
import ClotPressable from "@/components/common/ClotPressable";
import ParentContainer from "@/components/layout/ParentContainer";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import ProductFlatList from "@/components/products/ProductFlatList";
import { db } from "@/firebaseConfig";
import { Product } from "@/types/schema";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { ShoppingCartIcon } from "lucide-react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";

type OrderItem = Product & {
  unitCount: number;
};

const WelcomePage = () => {
  // hooks
  const [reels, setReels] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentProductItemId, setCurrentProductItemId] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [proceedToOrderItemList, setProceedToOrderItemList] = useState<
    OrderItem[]
  >([]);

  // variables
  const tabBarHeight = useBottomTabBarHeight();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    loadInitialPosts();
  }, []);

  // const snapPoints = useMemo(() => ["40%"], []);

  const presentBottomSheet = useCallback(function presentBottomSheetFunc() {
    bottomSheetModalRef.current?.present();
  }, []);

  const dismissBottomSheet = useCallback(function dismissBottomSheetFunc() {
    bottomSheetModalRef.current?.dismiss();
    setUnitCount(0);
    setCurrentProductItemId("");
  }, []);

  // fetch initial 5 items from endpoint
  const loadInitialPosts = async (limitCount = 10) => {
    try {
      const q = query(collection(db, "products"), limit(limitCount));

      const snapShot = await getDocs(q);

      const fetched: Product[] = snapShot.docs.map((doc) => {
        const data = doc.data() as Product;
        return {
          id: doc.id,
          ...data,
        } as Product;
      });

      setReels(fetched);
      setLastVisible(snapShot.docs[snapShot.docs.length - 1]);
      setHasMore(snapShot.docs.length === limitCount);
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  const loadMoreItems = async () => {
    if (!lastVisible || loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const q = query(
        collection(db, "products"),
        startAfter(lastVisible),
        limit(6)
      );

      const snapShot = await getDocs(q);
      const more: Product[] = snapShot.docs.map((doc) => {
        const data = doc.data() as Product;
        return {
          id: doc.id,
          ...data,
        } as Product;
      });

      if (more.length > 0) {
        setReels((prev) => [...prev, ...more]);
        setLastVisible(snapShot.docs[snapShot.docs.length - 1]);
        setHasMore(snapShot.docs.length === 6);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
    setLoadingMore(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInitialPosts();
    setRefreshing(false);
  };

  // this gets the current order product from the product id a usestate hook was not used because of data consistency
  const productToOrder = useMemo(
    () =>
      reels.find((item: Product) => item.productCode === currentProductItemId),
    [reels, currentProductItemId]
  );

  const handleActiveOrder = (productItem: Product) => {
    presentBottomSheet();
    setCurrentProductItemId(productItem.productCode);
    setUnitCount(1);
  };

  const incrementOrderUnit = () => {
    setUnitCount((prev) => prev + 1);
  };

  const decrementOrderUnit = useCallback(() => {
    setUnitCount((prev) => {
      if (prev <= 1) {
        dismissBottomSheet();
        return 0;
      }

      return prev - 1;
    });
  }, [dismissBottomSheet]);

  // seperate the business logic from the performance logic for scalability, reusability e.t.c
  const calculateTotal = (unit: number, price?: number) =>
    (unit * (price ?? 0)).toFixed(2);

  const totalPrice = useMemo(
    () => calculateTotal(unitCount, productToOrder?.price),
    [unitCount, productToOrder]
  );

  // this function is to get all the orders and their details
  const addProductToOrderList = (productItem: Product) => {
    setProceedToOrderItemList((prev: OrderItem[]) => [
      ...prev,
      { ...productItem, unitCount: unitCount },
    ]);

    dismissBottomSheet();
  };

  // calculate the total price of the productlist
  // const totalTotalPrice = (productList: OrderItem[]) => {
  //   productList.forEach((item: OrderItem, index: number) => {
  //     return item.
  //   });
  // }

  return (
    <SafeAreaWrapper>
      <View className="relative flex flex-col">
        <View className="flex flex-row flex-1 items-center justify-between">
          <ClotPressable
            onPress={() => console.log("avatar")}
            classname="size-10 rounded-full overflow-hidden"
          >
            <Image
              source={require("@/assets/images/avatar.jpg")}
              className="size-full"
            />
          </ClotPressable>

          <ClotButton classname="size-10">
            <ShoppingCartIcon color={"white"} size={16} />
          </ClotButton>
        </View>

        <ClotPressable
          onPress={() => console.log("search")}
          classname="bg-secondary h-11 rounded-full flex flex-row items-center gap-2 pl-4 overflow-hidden mt-8 mb-2"
        >
          <SearchIcon />
          <Text className="text-lg">Search</Text>
        </ClotPressable>

        <FlatList
          data={reels}
          keyExtractor={(item) => item.productCode}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>Loading...</Text>}
          numColumns={2}
          scrollEnabled={!sheetOpen}
          onEndReached={sheetOpen ? null : loadMoreItems}
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
            paddingBottom: tabBarHeight + 166,
            marginTop: 20,
          }}
        />

        <View
          className="absolute left-0 right-0 z-50"
          style={{ bottom: tabBarHeight + 75, width: "100%" }}
        >
          <ClotButton classname="py-5 rounded-lg w-full bg-primary shadow-lg">
            <Text className="text-white font-semibold text-xl text-center">
              Proceed to order   {proceedToOrderItemList.length} item
            </Text>
          </ClotButton>
        </View>

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
              <Text
                onPress={dismissBottomSheet}
                className="font-semibold text-lg"
              >
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
      </View>
    </SafeAreaWrapper>
  );
};

export default WelcomePage;
