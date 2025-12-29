import SearchIcon from "@/assets/icons/SearchIcon";
import ClotButton from "@/components/clotbutton";
import ClotPressable from "@/components/common/ClotPressable";
import ParentContainer from "@/components/layout/ParentContainer";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import ProductFlatList from "@/components/products/ProductFlatList";
import { db } from "@/firebaseConfig";
import { Product } from "@/types/schema";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
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
  StyleSheet,
  Text,
  View,
} from "react-native";

const WelcomePage = () => {
  const [reels, setReels] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const tabBarHeight = useBottomTabBarHeight();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const snapPoints = useMemo(() => ["40%"], []);

  const presentBottomSheet = useCallback(function presentBottomSheetFunc() {
    bottomSheetModalRef.current?.present();
  }, []);

  const dismissBottomSheet = useCallback(function dismissBottomSheetFunc() {
    bottomSheetModalRef.current?.dismiss();
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

  

  return (
    <SafeAreaWrapper>
      <ParentContainer>
        <View className="flex flex-row items-center justify-between">
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
          classname="bg-secondary h-11 rounded-full flex flex-row items-center gap-2 pl-4 overflow-hidden"
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
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <ProductFlatList productItem={item} onClose={dismissBottomSheet} onOpen={presentBottomSheet}/>
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
          contentContainerStyle={{ paddingBottom: tabBarHeight + 166 }}
        />

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
        >
          <BottomSheetView className="py-20 px-3">
            <Text onPress={dismissBottomSheet}>bottom sheet </Text>
          </BottomSheetView>
        </BottomSheetModal>
      </ParentContainer>
    </SafeAreaWrapper>
  );
};

export default WelcomePage;
