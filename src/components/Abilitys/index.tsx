import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Abilitys: React.FC = () => {
  const route = useRoute();

  const { abilitys } = route.params as any

  if (abilitys === undefined) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#010101' }}>
        <Text style={styles.selectAchampion}>Selecione um Campeão na aba campeões</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: '#010101', paddingTop: 20, }} showsVerticalScrollIndicator={false}>
        {abilitys.map((item: any, index: number) => {
            return (
              <View key={index} style={{ flexDirection: "column",  marginLeft: 20, backgroundColor: '#010101', alignItems: 'center' }}>  
                  <Image style={{ width: 64, height: 64, marginTop: 5, marginBottom: 20, borderRadius: 64 / 2, }} source={{
                          uri: `https://ddragon.leagueoflegends.com/cdn/10.15.1/img/spell/${item.id}.png` }}/>
                  <View style={{ marginLeft: 30, marginBottom: 10, }}>
                    <Text style={[styles.championDescription, { paddingLeft: 20, marginTop: 10, marginBottom: 10,}]}>{item.name}</Text>
                    <Text style={[styles.championDescription, { paddingLeft: 20, marginTop: 5, marginBottom: 5, }]}>{item.description}</Text>
                  </View>       
              </View>
            )
        })}
      </ScrollView>
    </View>
  );
}

export default Abilitys;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  selectAchampion: {
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
})
