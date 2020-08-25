import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { RectButton } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

interface RouteProps {
  name: string;
}

const Champion: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { name } = route.params as RouteProps;

  const [data, setData] = useState([]);
  const [championName, setChampionName] = useState("");
  const [championTitle, setChampionTitle] = useState("");
  const [championId, setChampionId] = useState("");
  const [lore, setLore] = useState("");
  const [speels, setSpeels] = useState([""]);
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    async function getEspecificChampion() {
      await axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/10.15.1/data/pt_BR/champion/${name}.json`
        )
        .then((response: any) => {
          const data = response.data["data"];
          const Name = data[name].name;
          const title = data[name].title;
          const id = data[name].id;
          const description = data[name].lore;
          const ability = data[name].spells;
          const skins = data[name].skins;

          setChampionName(Name);
          setData(data);
          setChampionId(id);
          setChampionTitle(title);
          setLore(description);
          setSpeels(ability);
          setSkins(skins);
        });
    }
    getEspecificChampion();
  }, []);

  function handleNavigateToAbilitys(abilitys: Object) {
    navigate("Abilitys", { abilitys });
  }

  function handleNavigateToSkins(skin: object, name: string) {
    navigate("Skins", { skin, name });
  }

  if (data === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Mada-Bold",
            fontSize: 45,
            lineHeight: 55,
            letterSpacing: 2,
            color: "#000",
          }}
        >
          Loading ....
        </Text>
      </View>
    );
  }

  const htmlContent = `<p>${lore}</p>`;

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      <LinearGradient
        colors={["rgba(209, 54, 56, 0.5)", "rgba(0, 0, 1, 0.9)"]}
        style={{
          position: "absolute",
          height: height * 1.2,
          left: 0,
          right: 0,
          top: 0,
          flex: 1,
        }}
      />
      <ScrollView>
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
        <Image
          style={styles.championImage}
          resizeMode="cover"
          source={{
            uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.championName}>{championName}</Text>
          <Text style={styles.championDescription}>{championTitle}</Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.championName, { letterSpacing: 2 }]}>
            Biografia
          </Text>
          <HTMLView value={htmlContent} stylesheet={styles} />
        </View>
        <RectButton
          onPress={() => handleNavigateToAbilitys(speels)}
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <Text style={styles.championDescription}>Ver Habilidades</Text>
          <AntDesign name="arrowright" size={24} color="#FCF7F8" />
        </RectButton>
        <RectButton
          onPress={() => handleNavigateToSkins(skins, name)}
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <Text style={styles.championDescription}>Ver Skins</Text>
          <AntDesign name="arrowright" size={24} color="#FCF7F8" />
        </RectButton>
      </ScrollView>
    </View>
  );
};

export default Champion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 1, 0.9)",
  },

  p: {
    fontFamily: "Mada-Regular",
    fontSize: 17,
    lineHeight: 30,
    color: "#FCF7F8",
    textAlign: "left",
    padding: 20,
  },

  font: {
    color: "#CCC",
    fontFamily: "Mada-Bold",
    fontSize: 17,
    lineHeight: 35,
  },

  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: height * 0.7,
    position: "absolute",
  },

  button: {
    alignItems: "center",
    marginTop: 50,
  },

  championName: {
    fontFamily: "Mada-Regular",
    letterSpacing: 5,
    fontSize: 50,
    lineHeight: 60,
    color: "#FCF7F8",
  },

  championDescription: {
    fontFamily: "Mada-Regular",
    fontSize: 25,
    lineHeight: 35,
    color: "#FCF7F8",
  },

  championLore: {
    textAlign: "left",
    fontFamily: "Mada-Regular",
    fontSize: 16,
    color: "#FCF7F8",
    paddingHorizontal: 20,
  },

  championImage: {
    zIndex: -1,
    width: width,
    height: height * 1.1,
  },
});
