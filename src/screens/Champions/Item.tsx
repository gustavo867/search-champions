import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Text, Animated, Dimensions, Easing, Image } from "react-native";
import { Champions as IChampions } from "../../redux/ducks/champions/types";
import { BASE_IMAGE_URL } from "../../services/api";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./index";
import { useDispatch } from "react-redux";
import { currentChampionRequest } from "../../redux/ducks/champions/actions";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const Item = ({ item, index }: { item: IChampions; index: number }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  let translateX = useRef(new Animated.Value(-width)).current;

  const uri = useMemo(() => {
    Image.prefetch(`${BASE_IMAGE_URL}${item.id}.png`);
    return `${BASE_IMAGE_URL}${item.id}.png`;
  }, [item.id]);

  const animatingEntry = useCallback(() => {
    if (index % 2 === 1) {
      translateX.setValue(width);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 1000,
        easing: Easing.bezier(0.85, 0, 0.15, 1),
        useNativeDriver: true,
      }).start();
    } else {
      translateX.setValue(-width);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 1000,
        easing: Easing.bezier(0.85, 0, 0.15, 1),
        useNativeDriver: true,
      }).start();
    }
  }, []);

  useEffect(() => {
    animatingEntry();
  }, []);

  function handleNavigateToChampions(name: string) {
    try {
      dispatch(currentChampionRequest(name));

      Toast.show({
        text1: "Redirecionando",
        type: "success",
      });

      navigate("Champion");

      return;
    } catch (e) {
      return;
    }
  }
  return (
    <Animated.View
      style={[
        styles.championCard,
        {
          transform: [{ translateX: translateX }],
        },
      ]}
    >
      <RectButton
        onPress={() => handleNavigateToChampions(item.id)}
        key={index}
      >
        <TouchableOpacity
          onPress={() => handleNavigateToChampions(item.id)}
          activeOpacity={0.7}
        >
          <Image
            style={styles.championImage}
            source={{
              uri: uri,
              cache: "force-cache",
            }}
            resizeMethod="resize"
          />
        </TouchableOpacity>
        <Text style={[styles.championName, { marginTop: 0 }]}>{item.name}</Text>
      </RectButton>
    </Animated.View>
  );
};

export default memo(Item);
