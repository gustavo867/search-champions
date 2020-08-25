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
import { useRoute, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

interface SkinsProps {
  skin: any;
  name: string;
}

interface ItemProps {
  name: string;
  num: number;
}

const { width, height } = Dimensions.get("window");

const Skins: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute();

  const { skin, name } = route.params as SkinsProps;

  const Item = (item: ItemProps, index: any) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.skinLenght}>
          {item.name === "default" ? "" : `Skins: ${skin.length - 1}`}
        </Text>
        <View key={index} style={{}}>
          <Image
            resizeMode="contain"
            style={{
              width: width,
              height: height * 1.2,
            }}
            source={{
              uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${item.num}.jpg`,
            }}
          />
          <Text style={styles.skinsName}>
            {item.name === "default" ? name + "" : item.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#010101" }}>
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
        bounces={false}
        horizontal={true}
        keyExtractor={(item: ItemProps) => item.name}
        data={skin}
        renderItem={({ item }: any) => <Item {...item} />}
      />
    </View>
  );
};

export default Skins;

const styles = StyleSheet.create({
  skinsName: {
    fontFamily: "Mada-Medium",
    fontSize: 25,
    letterSpacing: 2,
    color: "#C89933",
    width: 300,
    position: "absolute",
    zIndex: 1,
    marginTop: height * 0.9,
    marginLeft: width * 0.08,
  },

  skinLenght: {
    fontFamily: "Mada-Medium",
    fontSize: 25,
    letterSpacing: 2,
    color: "#C89933",
    width: 300,
    position: "absolute",
    zIndex: 1,
    marginTop: height * 0.08,
    textAlign: "center",
  },
});
