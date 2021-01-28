import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux";
import { championRequest } from "../../redux/ducks/champions/actions";
import Item from "./Item";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const Champions: React.FC = () => {
  const dispatch = useDispatch();
  const { champions, error, loading } = useSelector(
    (state: ApplicationState) => state.champions
  );
  const [search, setSearch] = useState("");

  const renderItem = useCallback(
    ({ item, index }: any) => <Item item={item} index={index} />,
    []
  );
  const keyExtractor = useCallback((item: any) => item.key, []);

  useEffect(() => {
    dispatch(championRequest());

    return () => {};
  }, []);

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
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
        <Text style={{ fontFamily: "Mada-Bold", fontSize: 50, color: "#FFFF" }}>
          Loading...
        </Text>
        <ActivityIndicator size="large" color="#FFFF" />
      </View>
    );
  }

  if (error.hasError) {
    Toast.show({
      text1: "Erro inesperado",
      type: "error",
    });
    return <View />;
  }

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
        data={champions.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        })}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={10}
        renderItem={renderItem}
        style={{ marginTop: 20, flexGrow: 0 }}
        numColumns={2}
        pointerEvents="none"
        updateCellsBatchingPeriod={8}
        windowSize={8}
      />
    </View>
  );
};

export default Champions;

export const styles = StyleSheet.create({
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
    borderColor: "#D5BA66",
    borderWidth: 0.2,
  },
});
