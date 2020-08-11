import React from 'react';
import { View, Image, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

interface SkinsProps {
  skin: any;
  name: string;
}

const { width, height } = Dimensions.get('window');

const Skins: React.FC = () => {
  const route = useRoute();

  const { skin, name, } = route.params as SkinsProps

  return (
    <View style={{ flex: 1, }}>
      <StatusBar style="light"/>
      <ScrollView snapToInterval={width} nestedScrollEnabled={true} alwaysBounceHorizontal={true} decelerationRate="fast" showsHorizontalScrollIndicator={false} horizontal={true}>
        {skin.map((item: any, index: any) => {
            return (
                <View key={index} style={{ alignItems: 'center', justifyContent: 'center', }}> 
                    <Image style={{ 
                      width: width, 
                      height: height * 1.2, 
                    }} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${item.num}.jpg` }}/>
                    <Text style={styles.skinsName}>{item.name === 'default' ? name + '' : item.name}</Text>
                </View>
            )
        })}
      </ScrollView>
    </View>
  );
}

export default Skins;

const styles = StyleSheet.create({
  skinsName: {
    fontFamily: 'Mada-Medium',
    fontSize: 18,
    color: '#F0F2A6',
    width: 300,
    position: 'absolute',
    zIndex: 1,
  },
})