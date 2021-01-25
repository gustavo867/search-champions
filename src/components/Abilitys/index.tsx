import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../redux";
import { SPEEL_IMAGE_URL } from "../../services/api";
import { Spells, Passive } from "../../redux/ducks/champions/types";

const { width, height } = Dimensions.get("window");

type IProps = {
  item: Spells & Passive;
  type: "passive" | "default";
};

const Abilitys: React.FC = () => {
  const { goBack } = useNavigation();
  const { spells: abilitys, passive } = useSelector(
    (state: ApplicationState) => state.champions.currentChampion
  );

  if (!abilitys) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#010101",
        }}
      >
        <Text style={styles.selectAchampion}>
          Selecione um Campeão na aba campeões
        </Text>
      </View>
    );
  }

  const Item = ({ item, type }: IProps) => {
    const htmlContent = `<p>${item.description}</p>`;
    return (
      <View
        key={`item.${item.name}`}
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 20,
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri:
              type === "passive"
                ? `http://ddragon.leagueoflegends.com/cdn/11.2.1/img/passive/${item.image.full}`
                : `${SPEEL_IMAGE_URL}${item.id}.png`,
          }}
        />
        <View
          style={{
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.championDescription, { marginBottom: 10 }]}>
            {item.name}
          </Text>
          <HTMLView value={htmlContent} stylesheet={styles} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#161616", "#161616"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          height: height * 2,
          left: 0,
          right: 0,
          top: 0,
          flex: 1,
        }}
      />
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
          <AntDesign name="back" size={34} color="#FFF" />
        </TouchableOpacity>
      )}
      <FlatList
        bounces={true}
        keyExtractor={(item: Spells) => item.id}
        ListHeaderComponent={() => (
          <Item item={passive as any} type="passive" />
        )}
        data={abilitys as any}
        renderItem={({ item }: any) => <Item item={item} type="default" />}
      />
    </SafeAreaView>
  );
};

export default Abilitys;

const styles = StyleSheet.create({
  p: {
    fontFamily: "Mada-Regular",
    fontSize: 17,
    lineHeight: 30,
    color: "#FCF7F8",
    textAlign: "center",
    width: width * 0.9,
  },

  font: {
    color: "#AAAAAA",
    fontFamily: "Mada-Bold",
    fontSize: 17,
    lineHeight: 35,
  },

  container: {
    flex: 1,
    paddingTop: 20,
  },

  selectAchampion: {
    fontFamily: "Mada-Regular",
    letterSpacing: 5,
    fontSize: 50,
    lineHeight: 60,
    color: "#FCF7F8",
  },

  championDescription: {
    fontFamily: "Mada-Regular",
    fontSize: 17,
    lineHeight: 35,
    color: "#FCF7F8",
    textAlign: "left",
  },

  image: {
    width: 64,
    height: 64,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 64 / 2,
    borderColor: "#CAB160",
    borderWidth: 2,
  },
});
