import ClotButton from "@/components/clotbutton";
import BottomSheetComponent from "@/components/common/BottomSheetComponent";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import FlatListProductCatalogue from "@/components/products/FlatListProductCatalogue";
import StickyHeightProvider from "@/context/StickyHeightProvider";
import { auth } from "@/firebaseConfig";
import useLoadItems from "@/hooks/useLoadItems";
import { loadInitialPosts } from "@/services/productService";
import { Product } from "@/types/schema";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { getAuth, signOut } from "firebase/auth";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";

type OrderItem = Product & {
  unitCount: number;
};


// this is the first screen to be displayed after a successful authentication
// i stopped at using usereducer for the complex operation for when the component first loads and when it continue loading on refresh
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
  const limitCount = 10;

  // hook to handle the process of a continuous fetching of product items from firestore
  const { loadItemsState, loadItemsDispatch } = useLoadItems();

  useEffect(() => {
    const handleLoadInitialPosts = async () => {
      const user = await new Promise((resolve) => {
        const unsubscribe = getAuth().onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user);
        });
      });

      if (user) {
        loadInitialPosts({
          limitCount,
          setHasMore,
          setLastVisible,
          setReels,
          loadItemsDispatch,
        });
      }

    };
    
    handleLoadInitialPosts();
  }, [loadItemsDispatch]);
  
  // const snapPoints = useMemo(() => ["40%"], []);
  console.log(loadItemsState)

  const presentBottomSheet = useCallback(function presentBottomSheetFunc() {
    bottomSheetModalRef.current?.present();
  }, []);

  const dismissBottomSheet = useCallback(function dismissBottomSheetFunc() {
    bottomSheetModalRef.current?.dismiss();
    setUnitCount(0);
    setCurrentProductItemId("");
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInitialPosts({
      limitCount,
      setHasMore,
      setLastVisible,
      setReels,
      loadItemsDispatch,
    });
    setRefreshing(false);
  };

  // this gets the current order product from the product id a usestate hook was not used because of data consistency
  const productToOrder = useMemo(
    () =>
      reels.find((item: Product) => item.productCode === currentProductItemId),
    [reels, currentProductItemId]
  );

  const handleActiveOrder = (productItem: Product) => {
    setCurrentProductItemId(productItem.productCode);
    setUnitCount(1);
    presentBottomSheet();
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

  const logout = async () => {
    await signOut(auth);
    console.log("logged Out");
  }

  return (
    <SafeAreaWrapper styles={{ paddingVertical: 0, paddingHorizontal: 0 }}>
      <StickyHeightProvider>
        <View className="relative flex flex-col">
          <FlatListProductCatalogue
            dismissBottomSheet={dismissBottomSheet}
            handleActiveOrder={handleActiveOrder}
            hasMore={hasMore}
            lastVisible={lastVisible}
            limitCount={limitCount}
            loadingMore={loadingMore}
            onRefresh={onRefresh}
            presentBottomSheet={presentBottomSheet}
            reels={reels}
            refreshing={refreshing}
            setCurrentProductItemId={setCurrentProductItemId}
            setHasMore={setHasMore}
            setLastVisible={setLastVisible}
            setLoadingMore={setLoadingMore}
            setReels={setReels}
            sheetOpen={sheetOpen}
            tabBarHeight={tabBarHeight}
            loadItemsDispatch={loadItemsDispatch}
          />

          <View
            className="absolute left-0 right-0 z-50"
            style={{ bottom: 10, width: "100%", paddingHorizontal: 10 }}
          >
            <TouchableOpacity onPress={logout}>
              <Text>Logout</Text>
            </TouchableOpacity>
            <ClotButton classname="py-5 rounded-lg w-full bg-primary shadow-lg">
              <Text className="text-white font-semibold text-xl text-center">
                Proceed to order {proceedToOrderItemList.length} item
              </Text>
            </ClotButton>
          </View>

          <BottomSheetComponent
            addProductToOrderList={addProductToOrderList}
            bottomSheetModalRef={bottomSheetModalRef}
            decrementOrderUnit={decrementOrderUnit}
            dismissBottomSheet={dismissBottomSheet}
            incrementOrderUnit={incrementOrderUnit}
            productToOrder={productToOrder}
            setSheetOpen={setSheetOpen}
            totalPrice={totalPrice}
            unitCount={unitCount}
          />
        </View>
      </StickyHeightProvider>
    </SafeAreaWrapper>
  );
};

export default WelcomePage;
