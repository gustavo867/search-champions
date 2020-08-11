import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import axios from 'axios';

// Mudança de interface
interface Item {
  name: string,
  blurb: string,
  key: number,
  id: string,
  title: string,
}

const Champions: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<any>({});

  function handleNavigateToChampions(name: string) {
      navigation.navigate('Champion', { name });
  }
  useFocusEffect(() => {
    async function getChampions() {
      await axios.get('https://ddragon.leagueoflegends.com/cdn/10.15.1/data/pt_BR/champion.json').then(response => {
          const data = Object.values(response.data.data)
          setData(data)
      })
    }
    getChampions()
  },)


  if (data.map === undefined) {
    return (
      <View style={{ backgroundColor: '#0101', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontFamily: 'Mada-Bold', fontSize: 50, color: '#010101' }}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: '#0101', justifyContent: 'center', alignItems: 'center', flex: 1, }}>

      <ScrollView style={{ marginTop: 40, }} decelerationRate="fast" showsVerticalScrollIndicator={false}>
        {data.map((item : Item)  => {
          return (
            <RectButton onPress={() => handleNavigateToChampions(item.id)} key={item.key} style={styles.championCard}>     
             <View style={{ flexDirection: 'row', }}>
                <Text style={[styles.championName, { marginLeft: 10, marginTop: 10, }]}>{item.name}</Text>
                <Text style={[styles.championName, { marginLeft: 5, marginTop: 10, }]}>{item.title}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 20, }}>
                <TouchableOpacity onPress={() => handleNavigateToChampions(item.id)} activeOpacity={0.7}>
                  <Image style={styles.championImage} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${item.id}.png` }}/>
                </TouchableOpacity>        
              </View>
            
            </RectButton>
          )
        })}
      </ScrollView>
     
    </View>
  );
}

export default Champions;

const styles = StyleSheet.create({
  championCard: {
    backgroundColor: '#FFF',
    width: 350,
    height: 250,
    marginBottom: 10,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 0.8,
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 2,
      height: 2,
    }
  },
  championName: {
    color: '#010101',
    fontSize: 18,
    fontFamily: 'Mada-Medium',
    textAlign: 'center',
  },
  championImage: {
    height: 120,
    width: 120,
    borderRadius: 12,
    marginLeft: 12,
  },
  championDescription: {
    fontSize: 18,
    fontFamily: 'Mada-Regular',
    color: '#010101',
    textAlign: 'left',
    width: 150,
    marginLeft: 15,
  },
})