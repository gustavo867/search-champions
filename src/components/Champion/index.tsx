import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RectButton } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../redux";

const { height, width } = Dimensions.get("window");

const Champion: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const { currentChampion: champion, loading } = useSelector(
    (state: ApplicationState) => state.champions
  );

  function handleNavigateToAbilitys() {
    navigate("Abilitys");
  }

  function handleNavigateToSkins() {
    navigate("Skins");
  }

  const uri = useMemo(() => {
    Image.prefetch(
      `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`
    );
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
  }, [champion.id]);

  if (loading || !uri || !champion.id) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#161616",
        }}
      >
        <Text
          style={{
            fontFamily: "Mada-Bold",
            fontSize: 45,
            lineHeight: 55,
            letterSpacing: 2,
            color: "#FFFF",
          }}
        >
          Loading ....
        </Text>
        <ActivityIndicator size="large" color="#FFFF" />
      </View>
    );
  }

  const htmlContent = `<p>${champion.lore}</p>`;

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      <LinearGradient
        colors={["#161616", "#161616"]}
        style={{
          position: "absolute",
          height: height * 1.2,
          left: 0,
          right: 0,
          top: 0,
          flex: 1,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
        style={{
          flexGrow: 0,
          width: width,
        }}
      >
        <Image
          style={[
            styles.championImage,
            {
              resizeMode: "cover",
            },
          ]}
          resizeMethod="resize"
          source={{ uri: uri }}
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

        <View style={styles.textContainer}>
          <Text style={styles.championName}>{champion.name}</Text>
          <Text style={styles.championDescription}>{champion.title}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={[
              styles.championName,
              {
                letterSpacing: 1,
                color: "#D5BA66",
                fontSize: 30,
                textTransform: "uppercase",
              },
            ]}
          >
            Biografia
          </Text>
          <HTMLView value={htmlContent} stylesheet={styles} />
        </View>
        <RectButton
          onPress={() => handleNavigateToAbilitys()}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 10,
            width: width,
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text style={[styles.championDescription, { textAlign: "left" }]}>
            Ver Habilidades
          </Text>
          <AntDesign name="arrowright" size={24} color="#FCF7F8" />
        </RectButton>
        <RectButton
          onPress={() => handleNavigateToSkins()}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 20,
            width: width,
            paddingHorizontal: 20,
          }}
        >
          <Text style={[styles.championDescription, { textAlign: "left" }]}>
            Ver Skins
          </Text>
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
    fontFamily: "Mada-Bold",
    fontSize: 16,
    lineHeight: 25,
    color: "#AAAAAA",
    textAlign: "left",
  },

  font: {
    color: "#CCC",
    fontFamily: "Mada-Bold",
    fontSize: 17,
    lineHeight: 35,
  },

  textContainer: {
    top: 50,
    right: width * 0.05,
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  button: {
    alignItems: "center",
    marginTop: 50,
  },

  championName: {
    fontFamily: "Mada-Medium",
    letterSpacing: 5,
    fontSize: 50,
    lineHeight: 60,
    color: "#FCF7F8",
    textAlign: "right",
  },

  championDescription: {
    fontFamily: "Mada-Medium",
    fontSize: 20,
    color: "#FCF7F8",
    width: width * 0.5,
    textAlign: "right",
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
    width: width * 1.2,
    height: height * 1.1,
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
