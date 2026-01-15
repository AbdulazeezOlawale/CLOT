import React, { JSX, useEffect, useRef } from "react";
import {
  Animated,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { useCustomFlatListHook } from "./useCustomFlatListHook";
import { FlatList } from "react-native-gesture-handler";

type CustomFlatListProps<T> = Omit<FlatListProps<T>, "ListHeaderComponent"> & {
  HeaderComponent?: JSX.Element;
  StickyElementComponent: JSX.Element;
  TopListElementComponent?: JSX.Element;
  sheetOpen?: boolean
};

function CustomFlatList<T>({
  style,
  sheetOpen,
  ...props
}: CustomFlatListProps<T>): React.ReactElement {

const scrollRef = useRef<FlatList>(null);
const lastScrollY = useRef(0);

useEffect(() => {
  if (!sheetOpen) {
    scrollRef.current?.scrollToOffset({
      offset: lastScrollY.current,
      animated: false,
    });
    
  }
},[sheetOpen]);


  const [
    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutStickyElement,
  ] = useCustomFlatListHook();

  return (
    <View style={style}>
      <Animated.View
        style={styles.stickyElement}
        onLayout={onLayoutStickyElement}
        pointerEvents="box-none"
      >
        {props.StickyElementComponent}
      </Animated.View>

      <Animated.View
        style={styles.topElement}
        onLayout={onLayoutTopListElement}
        pointerEvents="box-none"
      >
        {props.TopListElementComponent}
      </Animated.View>

      <Animated.FlatList<any>
        {...props}
        ref={scrollRef}
        ListHeaderComponent={
          // <-- Header Component
          <Animated.View onLayout={onLayoutHeaderElement}>
            {props.HeaderComponent}
          </Animated.View>
        }
        ListHeaderComponentStyle={[
          props.ListHeaderComponentStyle,
          styles.header,
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener(event: NativeSyntheticEvent<NativeScrollEvent>) {
              lastScrollY.current = event.nativeEvent.contentOffset.y;
            },
          }
        )}
      />
    </View>
  );
}

export default CustomFlatList;
