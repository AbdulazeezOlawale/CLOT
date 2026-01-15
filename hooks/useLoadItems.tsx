import { InitialStateType, LoadItemsAction, LoadItemsKind } from "@/types/schema";
import { useReducer } from "react";

const useLoadItems = () => {
  // initial state definition for usereducer hook
  const initialState: InitialStateType = {
    productItems: undefined,
    lastVisible: null,
    hasMore: false,
  };

  //   reducer function for the usereducer hook
  const reducer = (state: InitialStateType, action: LoadItemsAction) => {
    switch (action.type) {
      case LoadItemsKind.GETMORE:
        return {
          productItems: action.productItems,
          lastVisible: action.lastVisible,
          hasMore: action.hasMore,
        };
      case LoadItemsKind.NOTHINGMORE:
        return {
          hasMore: action.hasMore,
        };
      default:
        return state;
    }
  };

  //   main usereducer definition containing the reducer function and the initialstate and returning the dispatch and the state
  const [loadItemsState, loadItemsDispatch] = useReducer(reducer, initialState);

  //   this items are returned so that when i call it in another component i can just descructure it and use it on the go
  return { loadItemsState, loadItemsDispatch };
};

export default useLoadItems;