import SearchIcon from "@/assets/icons/SearchIcon";
import ClotButton from "@/components/clotbutton";
import ClotPressable from "@/components/common/ClotPressable";
import ParentContainer from "@/components/common/ParentContainer";
import { SafeAreaWrapper } from "@/components/layout/SafeAreaWrapper";
import { db } from "@/firebaseConfig";
import { Product } from "@/types/schema";
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
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

const WelcomePage = () => {
  const [reels, setReels] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    loadInitialPosts();
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
      setHasMore(snapShot.docs.length === limitCount)
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
  }
  
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
            <ShoppingCartIcon color={"white"} size={16}/>
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          renderItem={({ item }) => (
            <View className="bg-secondary rounded-lg shadow-sm">
              <View className="size-52">
                <Image
                  source={{ uri: item.image }}
                  className="size-full"
                  resizeMode="cover"
                />
              </View>
              <View className="px-2 py-3">
                <Text className="font-bold text-lg">{item.title}</Text>
                <Text>${item.price}</Text>
              </View>
            </View>
          )}
          columnWrapperStyle={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{paddingBottom: tabBarHeight + 166}}
        />
      </ParentContainer>
    </SafeAreaWrapper>
  );
};

export default WelcomePage;
