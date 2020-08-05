import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

interface Item {
  name: string,
  blurb: string,
  key: number,
}


const styles = StyleSheet.create({
  championCard: {
    backgroundColor: '#FFF',
    width: 300,
    height: 250,
    marginBottom: 10,
  },
})

const Champions: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<any>({});

  function handleNavigateToChampions() {
      navigation.navigate('SearchEspecificChampions');
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
      <View style={{ backgroundColor: '#8257E5', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontFamily: 'Mada-Bold', fontSize: 50, color: '#FFF' }}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: '#8257E5', justifyContent: 'center', alignItems: 'center', flex: 1, }}>

      <ScrollView style={{ marginTop: 50, }} showsVerticalScrollIndicator={false}>
        {data.map((item : any)  => {
          return (
            <View key={item.key} style={styles.championCard}>
              <Text>{item.name}</Text>
              <Image style={{ height: 120, width: 120, }} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${item.name}.png` }}/>
            </View>
          )
        })}
      </ScrollView>
     
    </View>
  );
}

export default Champions;