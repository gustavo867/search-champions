import React, { memo, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton, FlatList, TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native-expo-image-cache";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux";
import {
  championRequest,
  currentChampionRequest,
} from "../../redux/ducks/champions/actions";
import { showMessage } from "react-native-flash-message";
import { Champions as IChampions } from "../../redux/ducks/champions/types";
import { BASE_IMAGE_URL } from "../../services/api";

const { width, height } = Dimensions.get("window");

const Champions: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { champions, error, loading } = useSelector(
    (state: ApplicationState) => state.champions
  );
  const [search, setSearch] = useState("");

  const renderItem = ({ item, index }: any) => <Item {...item} index={index} />;
  const keyExtractor = useCallback((item: any) => item.key, []);

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

  useEffect(() => {
    dispatch(championRequest());
  }, []);

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <LinearGradient
          colors={["rgba(209, 54, 56, 0.5)", "rgba(0, 0, 1, 0.7)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            height: "100%",
            left: 0,
            right: 0,
            top: 0,
          }}
        />
        <Text
          style={{ fontFamily: "Mada-Bold", fontSize: 50, color: "#010101" }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  if (error.hasError) {
    showMessage({
      message: "Erro inesperado",
      type: "danger",
      duration: 1500,
    });
    return <View />;
  }

  const Item = memo((item: IChampions, index: number) => {
    return (
      <RectButton
        onPress={() => handleNavigateToChampions(item.id)}
        key={index}
        style={styles.championCard}
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
    );
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#161616", "#161616"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          height: "100%",
          left: 0,
          right: 0,
          top: 0,
        }}
      />
      <TextInput
        style={{
          width: width * 0.8,
          alignSelf: "center",
          height: height * 0.08,
          backgroundColor: "#AAAAAA",
          color: "#000",
          paddingLeft: 20,
          marginTop: 50,
          borderRadius: 8,
        }}
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Pesquisa pelos campeões"
        placeholderTextColor="#000"
      />
      <FlatList
        bounces={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={champions.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        })}
        maxToRenderPerBatch={10}
        renderItem={renderItem}
        style={{ marginTop: 20, flexGrow: 0 }}
        numColumns={2}
      />
    </View>
  );
};

export default Champions;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  championCard: {
    width: "40%",
    height: 150,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 10,
      height: 4,
    },
    marginRight: 20,
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  championName: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 18,
    fontFamily: "Mada-Medium",
    textAlign: "center",
  },
  championImage: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
  },
});
