import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { RectButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

interface RouteProps {
  name: string;
}

const Champion: React.FC = () => {
  const { navigate } = useNavigation();
  const route = useRoute()
  const { name } = route.params as RouteProps

  const [data, setData] = useState([]);
  const [championName, setChampionName] = useState('');
  const [championTitle, setChampionTitle] = useState('')
  const [championId, setChampionId] = useState('');
  const [lore, setLore] = useState('');
  const [speels, setSpeels] = useState([''])
  const [skins, setSkins] = useState([])

  const [isPress, setIsPress] = useState(false);

  useFocusEffect(() => {
    async function getEspecificChampion() {
      await axios.get(`https://ddragon.leagueoflegends.com/cdn/10.15.1/data/pt_BR/champion/${name}.json`).then(response => {
          const data = response.data['data']
          const Name = data[name].name
          const title = data[name].title
          const id = data[name].id
          const description = data[name].lore
          const ability = data[name].spells
          const skins = data[name].skins

          setChampionName(Name)
          setData(data)
          setChampionId(id)
          setChampionTitle(title)
          setLore(description)
          setSpeels(ability)
          setSkins(skins)
      })
    } 
    getEspecificChampion()
  })

  function handlePress() {
    setIsPress((prevState) => !prevState)
  } 

  function handleNavigateToAbilitys(abilitys: Object) {
    navigate('Abilitys', { abilitys })
  }

  function handleNavigateToSkins(skin: object, name: string,) {
    navigate('Skins', { skin, name, })
  }

  if (data === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontFamily: 'Mada-Bold', fontSize: 45, lineHeight: 55, letterSpacing: 2, color: '#000' }}>Loading ....</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent/>
      <ScrollView style={{ backgroundColor: '#010101' }}>
        <Image style={styles.championImage} source={{ uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg` }}/>
        <View style={styles.textContainer}>
          <Text style={styles.championName}>{championName}</Text>
          <Text style={styles.championDescription}>{championTitle}</Text>    
        </View>     
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[styles.championName, { letterSpacing: 2, }]}>Biografia</Text> 
          <Text numberOfLines = { isPress ? 30 : 3 } ellipsizeMode = 'tail' style={styles.championLore}>{lore}</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.championLore, { marginBottom: 15, marginTop: 10, }]}>{isPress ? 'Minimizar' : 'Ler Mais' }</Text>
          </TouchableOpacity>
        </View>  
        <RectButton onPress={() => handleNavigateToAbilitys(speels)} style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginBottom: 20, }}>
          <Text style={styles.championDescription}>Ver Habilidades</Text>
          <AntDesign name="arrowright" size={24} color="#F0F2A6" />
        </RectButton>  
        <RectButton onPress={() => handleNavigateToSkins(skins, name)} style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginBottom: 20, }}>
          <Text style={styles.championDescription}>Ver Skins</Text>
          <AntDesign name="arrowright" size={24} color="#F0F2A6" />
        </RectButton> 
      </ScrollView>
    </View>
  );
}

export default Champion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#010101'
  },

  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.7,
    position: 'absolute',
  },

  button: {
    alignItems: 'center',
    marginTop: 50,
  },

  championName: {
    fontFamily: 'Mada-Regular',
    letterSpacing: 5,
    fontSize: 50,
    lineHeight: 60,
    color: '#F0F2A6'
  },

  championDescription: {
    fontFamily: 'Mada-Regular',
    fontSize: 25,
    lineHeight: 35,
    color: '#F0F2A6'
  },

  championLore: {
    textAlign: 'left',
    fontFamily: 'Mada-Regular',
    fontSize: 16,
    color: '#F0F2A6',
    paddingHorizontal: 20,
  },

  championImage: {
    zIndex: -1,
    width: width,
    height: height * 1.1,
  },
})