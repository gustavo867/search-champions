import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';

interface SkinsProps {
  skin: any;
  name: string;
}

interface ItemProps {
  name: string;
  num: number;
}

const { width, height } = Dimensions.get('window');

const Skins: React.FC = () => {
  const route = useRoute();

  const { skin, name, } = route.params as SkinsProps


  const Item = (item: ItemProps, index: any) => {
    return (
      <View key={index} style={{ alignItems: 'center', justifyContent: 'center', }}> 
        <Image resizeMode="contain" style={{ 
          width: width, 
          height: height * 1.2, 
        }} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${item.num}.jpg` }}/>
        <Text style={styles.skinsName}>{item.name === 'default' ? name + '' : item.name}</Text>
      </View>
    )
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#010101" }}>
      <StatusBar style="light"/>
      <FlatList
        initialScrollIndex={1}
        decelerationRate="fast"
        snapToInterval={width}
        pagingEnabled={true}
        bounces={true}
        horizontal={true}
        keyExtractor={(item: ItemProps) => item.name}
        data={skin}
        renderItem={({ item }: any) => <Item {...item}/>}
      />
    </View>
  );
}

export default Skins;

const styles = StyleSheet.create({
  skinsName: {
    fontFamily: 'Mada-Medium',
    fontSize: 25,
    letterSpacing: 2,
    color: '#FCA311',
    width: 300,
    position: 'absolute',
    zIndex: 1,
  },
})