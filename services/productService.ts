import { db } from "@/firebaseConfig";
import { loadingMoreItemsProps, LoadItemsKind, Product, productServiceProps } from "@/types/schema";
import { collection, getDocs, limit, query, startAfter } from "firebase/firestore";

// fetch initial 5 items from endpoint
export const loadInitialPosts = async ({
  limitCount,
  setReels,
  setLastVisible,
  setHasMore,
  loadItemsDispatch,
}: productServiceProps) => {
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
    setHasMore(snapShot.docs.length >= limitCount);

    loadItemsDispatch({
      productItems: fetched,
      hasMore: snapShot.docs.length >= limitCount,
      lastVisible: snapShot.docs[snapShot.docs.length - 1],
      type: LoadItemsKind.GETMORE,
    });
  } catch (error) {
    console.error("Error loading more posts:", error);
  }
};

// continue Fetching the remaining data
export const loadMoreItems = async ({hasMore, lastVisible, loadingMore, setHasMore, setLastVisible, setLoadingMore, setReels}: loadingMoreItemsProps) => {
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
