import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton, FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const Champions: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<any>({});

  function handleNavigateToChampions(name: string) {
      navigation.navigate('Champion', { name });
  }
  useEffect(() => {
    async function getChampions() {
      await axios.get('https://ddragon.leagueoflegends.com/cdn/10.15.1/data/pt_BR/champion.json').then(response => {
          const data = Object.values(response.data.data)
          setData(data)
      })
    }
    getChampions()
  },[])

  if (data.map === undefined) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <LinearGradient
          colors={['rgba(209, 54, 56, 0.5)' , 'rgba(0, 0, 1, 0.7)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', height: '100%' , left: 0, right: 0, top: 0,}}
        />
        <Text style={{ fontFamily: 'Mada-Bold', fontSize: 50, color: '#010101' }}>Loading...</Text>
      </View>
    )
  }

  const Item = (item: any, index: number) => {
    return (
      <RectButton onPress={() => handleNavigateToChampions(item.id)} key={index} style={styles.championCard}>     
          <Text style={[styles.championName, { marginTop: 0, }]}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleNavigateToChampions(item.id)} activeOpacity={0.7}>
            <Image style={styles.championImage} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${item.id}.png` }}/>
          </TouchableOpacity>                 
      </RectButton>
    )
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
      <LinearGradient
        colors={['rgba(209, 54, 56, 0.5)' , 'rgba(0, 0, 1, 0.7)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', height: '100%' , left: 0, right: 0, top: 0,}}
      />
      <FlatList
        bounces={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.key}
        data={data}
        renderItem={({ item, index }: any) => <Item {...item} index={index}/>}
        style={{ marginTop: 40,}}
        numColumns={2}
      />
    </View>
  );
}

export default Champions;

const styles = StyleSheet.create({
  championCard: {
    width: '40%',
    height: 150,
    marginBottom: 10,
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 10,
      height: 4,
    },
    marginRight: 20,
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  championName: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    fontFamily: 'Mada-Medium',
    textAlign: 'center',
  },
  championImage: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
  },
})