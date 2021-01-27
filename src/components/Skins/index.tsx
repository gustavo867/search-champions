import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../redux";

interface ItemProps {
  name: string;
  num: number;
}

const { width, height } = Dimensions.get("window");

const Skins: React.FC = () => {
  const { skins, name } = useSelector(
    (state: ApplicationState) => state.champions.currentChampion
  );

  const xScroll = useRef(new Animated.Value(0)).current;

  const uriArray = useMemo(() => {
    return skins.map((item) => {
      Image.prefetch(
        `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${item.num}.jpg`
      );
      return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${item.num}.jpg`;
    });
  }, [skins]);

  const renderItem = useCallback(
    ({ item, index }: any) => <Item item={item} index={index} />,
    []
  );
  const keyExtractor = useCallback((item: any) => item.name, []);

  const Item = memo(({ item, index }: { item: ItemProps; index: number }) => {
    const uri = useMemo(() => {
      return uriArray[index];
    }, [index]);

    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const outputRange = ["-90deg", "0deg", "90deg"];

    const translateX = xScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp",
    });

    return (
      <View
        pointerEvents="none"
        key={index}
        style={{ alignItems: "center", width: width }}
      >
        <Text style={styles.skinLenght}>
          {item.name === "default" ? "" : `Skins: ${skins.length - index}`}
        </Text>
        <Animated.Image
          style={{
            width: 300,
            height: 520,
            alignSelf: "center",
            borderRadius: 12,
            resizeMode: "cover",
            transform: [{ rotateZ: translateX }],
          }}
          resizeMethod="resize"
          source={{
            uri: uri,
            cache: "force-cache",
          }}
        />
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.skinsName}>
          {item.name === "default" ? name + "" : item.name}
        </Text>
      </View>
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#161616" }}>
      <Animated.FlatList
        decelerationRate="fast"
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xScroll } } }],
          { useNativeDriver: true }
        )}
        horizontal={true}
        keyExtractor={keyExtractor}
        data={skins as any}
        renderItem={renderItem}
        maxToRenderPerBatch={8}
        pointerEvents="none"
        scrollEventThrottle={16}
        updateCellsBatchingPeriod={8}
      />
    </View>
  );
};

export default Skins;

const styles = StyleSheet.create({
  skinsName: {
    fontFamily: "Mada-Medium",
    fontSize: 20,
    letterSpacing: 2,
    color: "#FFFFFFFF",
    width: 270,
    maxHeight: 70,
    position: "absolute",
    zIndex: 1,
    bottom: -height * 0.1,
    marginLeft: width * 0.05,
  },

  skinLenght: {
    fontFamily: "Mada-Medium",
    fontSize: 25,
    letterSpacing: 2,
    color: "#FFFFFFFF",
    width: 300,
    position: "absolute",
    zIndex: 1,
    top: -height * 0.07,
    textAlign: "center",
  },
});
