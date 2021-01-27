import React, { memo, useCallback, useEffect, useRef } from "react";
import { Text, Animated, Dimensions, Easing } from "react-native";
import { Champions as IChampions } from "../../redux/ducks/champions/types";
import { BASE_IMAGE_URL } from "../../services/api";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./index";
import { Image } from "react-native-expo-image-cache";
import { useDispatch } from "react-redux";
import { currentChampionRequest } from "../../redux/ducks/champions/actions";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Item = ({ item, index }: { item: IChampions; index: number }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  let translateX = useRef(new Animated.Value(-width)).current;

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

      showMessage({
        message: "Redirecionando",
        type: "success",
        duration: 500,
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
            uri={`${BASE_IMAGE_URL}${item.id}.png`}
          />
        </TouchableOpacity>
        <Text style={[styles.championName, { marginTop: 0 }]}>{item.name}</Text>
      </RectButton>
    </Animated.View>
  );
};

export default memo(Item);
