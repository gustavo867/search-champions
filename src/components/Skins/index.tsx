import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../redux";

interface ItemProps {
  name: string;
  num: number;
}

const { width, height } = Dimensions.get("window");

const Skins: React.FC = () => {
  const { goBack } = useNavigation();
  const { skins, name } = useSelector(
    (state: ApplicationState) => state.champions.currentChampion
  );

  const Item = ({ item, index }: { item: ItemProps; index: number }) => {
    return (
      <View style={{ alignItems: "center", width: width }}>
        <Text style={styles.skinLenght}>
          {item.name === "default" ? "" : `Skins: ${skins.length - index}`}
        </Text>
        <View key={index}>
          <Image
            resizeMode="cover"
            style={{
              width: 300,
              height: 520,
              alignSelf: "center",
              borderRadius: 12,
            }}
            source={{
              uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${item.num}.jpg`,
            }}
          />
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.skinsName}>
            {item.name === "default" ? name + "" : item.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#161616" }}>
      <StatusBar style="light" />
      {Platform.OS === "ios" && (
        <TouchableOpacity
          onPress={() => goBack()}
          style={{
            marginTop: height * 0.08,
            marginLeft: 20,
            zIndex: 2,
            position: "absolute",
          }}
        >
          <AntDesign name="back" size={34} color="#C89933" />
        </TouchableOpacity>
      )}
      <FlatList
        initialScrollIndex={1}
        decelerationRate="fast"
        snapToInterval={width}
        pagingEnabled={true}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        bounces={false}
        horizontal={true}
        keyExtractor={(item: ItemProps) => item.name}
        data={skins as any}
        renderItem={({ item, index }: any) => (
          <Item item={item} index={index} />
        )}
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
