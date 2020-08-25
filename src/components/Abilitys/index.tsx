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
import { useRoute, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";

const { width, height } = Dimensions.get("window");
interface ItemProps {
  name: string;
  num: number;
  id: string;
  description: string;
}

const Abilitys: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute();

  const { abilitys } = route.params as any;

  if (abilitys === undefined) {
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

  const Item = (item: ItemProps, index: number) => {
    const htmlContent = `<p>${item.description}</p>`;
    return (
      <View
        key={index}
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
            uri: `https://ddragon.leagueoflegends.com/cdn/10.15.1/img/spell/${item.id}.png`,
          }}
        />
        <View
          style={{
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.championDescription,
              { marginTop: 10, marginBottom: 10 },
            ]}
          >
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
        colors={["rgba(209, 54, 56, 0.5)", "rgba(0, 0, 1, 1)"]}
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
        keyExtractor={(item: ItemProps) => item.id}
        data={abilitys}
        renderItem={({ item }: any) => <Item {...item} />}
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
    textAlign: "left",
    width: width,
    padding: 20,
  },

  font: {
    color: "#CCC",
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
    borderColor: "#FCA311",
    borderWidth: 2,
  },
});
