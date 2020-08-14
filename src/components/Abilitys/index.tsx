import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface ItemProps {
  name: string;
  num: number;
  id: string;
  description: string;
}

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

  const Item = (item: ItemProps, index: number) => {
    return (
      <View key={index} style={{ flexDirection: "column", alignItems: 'center', paddingTop: 20, justifyContent: 'center', }}>  
        <Image style={styles.image} source={{
                uri: `https://ddragon.leagueoflegends.com/cdn/10.15.1/img/spell/${item.id}.png` }}/>
        <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
          <Text style={[styles.championDescription, { marginTop: 10, marginBottom: 10,}]}>{item.name}</Text>
        <Text style={[styles.championDescription, { paddingLeft: 20, marginTop: 5, marginBottom: 5, width: 350, }]}>{item.id}: {' '}{item.description}</Text>
        </View>       
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 0, 1, 0.7))' , 'rgba(0, 0, 1, 0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', height: height * 2, left: 0, right: 0, top: 0, flex: 1,}}
      />
      <FlatList
         bounces={true}
         keyExtractor={(item: ItemProps) => item.id}
         data={abilitys}
         renderItem={({ item }: any) => <Item {...item}/>}
      />
    </SafeAreaView>
  );
}

export default Abilitys;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  selectAchampion: {
    fontFamily: 'Mada-Regular',
    letterSpacing: 5,
    fontSize: 50,
    lineHeight: 60,
    color: '#FCA311'
  },

  championDescription: {
    fontFamily: 'Mada-Regular',
    fontSize: 17,
    lineHeight: 35,
    color: '#FCA311',
    textAlign: 'left'
  },

  image: { 
    width: 64, 
    height: 64, 
    marginTop: 5, 
    marginBottom: 20, 
    borderRadius: 64 / 2,
    borderColor: '#FCA311',
    borderWidth: 2,
   }
})
