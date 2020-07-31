import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

interface Params {
    id: string,
    name: string,
    chromas: boolean,
    num: number,
    map: any,
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Mada-Regular',
        fontSize: 17,
        color: '#FFFF',
        marginTop: 2,
        marginLeft: 2,
    },
    input: { 
        marginTop: height / 15, 
        width: '60%', 
        alignItems: 'center',
        backgroundColor: '#FFFFFF', 
        borderRadius: 27, 
        borderColor: '#D9D0E3' , 
        borderWidth: 2, 
        height: 47, 
        flexDirection: 'row',
    },
    image: {
        width: 120, 
        height: 120, 
        marginTop: 20, 
        marginBottom: 20,
    },
    textChampionName: {
        fontFamily: 'Mada-Medium',
        color: '#FFFF',
        fontSize: 24
    },
    textChampionDescription: {
        fontFamily: 'Mada-Regular',
        fontSize: 17,
        color: '#FFFF',
        textAlign: 'left',
        marginLeft: 21,
    },
    textAttack: {
        color: '#d13639',
        fontFamily: 'Mada-Regular',
        fontSize: 18
    },
    textDefense: {
        color: '#0094C6',
        fontFamily: 'Mada-Regular',
        fontSize: 18,
        marginLeft: 21,
    },
    textMagic: {
        color: '#7159c1',
        fontFamily: 'Mada-Regular',
        fontSize: 18,
        marginLeft: 21,
    },
    textDifficulty: {
        color: '#87D68D',
        fontFamily: 'Mada-Regular',
        fontSize: 18,
        marginLeft: 21,
    },
    textTag: {
        fontFamily: 'Mada-Bold',
        color: '#FFFF',
        fontSize: 35,
        marginTop: 20,
        marginLeft: 20,
    },
    skinsName: {
        fontFamily: 'Mada-Medium',
        fontSize: 18,
        color: '#FFFFFF',
        width: 300,
    },
})

const Champions: React.FC = () => {
    const [championName, setChampionName] = useState('Aatrox');
    const [championDescription, setChampionDescription] = useState('');
    const [tags, setTags] = useState(['']);
    const [skins, setSkins] = useState<Params>([''])

    const [infoAttack, setInfoAttack] = useState('');
    const [infoDefense, setInfoDefense] = useState('');
    const [infoMagic, setInfoMagic] = useState('');
    const [infoDifficulty, setInfoDifficulty] = useState('');

        async function getChampions() {
            await axios.get(`https://ddragon.leagueoflegends.com/cdn/10.15.1/data/pt_BR/champion/${championName}.json`).then(response => {
                const data = response.data['data']

                const champion = data[championName].name
                const description = data[championName].blurb
                const tags = data[championName].tags
                const skins = data[championName].skins

                const championInfoAttack = data[championName].info.attack
                const championInfoDefense = data[championName].info.defense
                const championInfoMagic = data[championName].info.magic
                const championInfoDifficulty = data[championName].info.difficulty

                setChampionName(champion);
                setChampionDescription(description);
                setTags(tags)
                setSkins(skins)

                setInfoAttack(championInfoAttack);
                setInfoDefense(championInfoDefense);
                setInfoMagic(championInfoMagic);
                setInfoDifficulty(championInfoDifficulty);

                console.log(skins)
            })
        }

        function handleSubmit() {
            getChampions();
        }

  return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#010101' }}>
          <StatusBar style="light"/>

          <View style={{ flexDirection: 'row', }}>
          <View style={styles.input}>
                <Ionicons style={{ marginLeft: 25, marginRight: 20, }} name="ios-search" size={28} color="#2D0C57" />
                <TextInput
                    placeholder="Search"
                    value={championName}
                    onChangeText={setChampionName}  
                    style={{ color: '#2D0C57', fontSize: 17, }}
                />
                
            </View>
            <View>
                <TouchableOpacity style={{ 
                    marginLeft: 20, 
                    width: 120, 
                    height: 47, 
                    backgroundColor: '#d13639', 
                    borderRadius: 24, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginTop: height / 15,  
                    }} onPress={handleSubmit} >
                    <Text>Search</Text>
                </TouchableOpacity>
                </View>
          </View>
          
          <ScrollView style={{ marginTop: 30 , width: width, }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Text style={styles.textChampionName}>{championName}</Text>
                <Text numberOfLines = { 4 } ellipsizeMode = 'tail' style={styles.textChampionDescription}>{championDescription}</Text>
                <View style={{ flexDirection: 'row', }}>
                    <Image style={styles.image} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${championName}.png` }}/>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textTag}>{tags[0]}</Text>
                        <Text style={[styles.textTag, ]}>{tags[1]}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={styles.textAttack}> Attack: </Text>
                    <Text style={styles.text}>{infoAttack}</Text>
                    <Text style={styles.textDefense}> Defense: </Text>
                    <Text style={styles.text}>{infoDefense}</Text>
                    <Text style={styles.textMagic}> Magic: </Text>
                    <Text style={styles.text}>{infoMagic}</Text>
                    <Text style={styles.textDifficulty}> Difficulty: </Text>
                    <Text style={styles.text}>{infoDifficulty}</Text>
                </View>
                <ScrollView horizontal={true}>
                    {skins.map((item: any) => {
                        return (
                            <View style={{ alignItems: 'center', marginTop: 20, }}> 
                                <Text numberOfLines = { 1 } ellipsizeMode = 'tail' style={styles.skinsName}>{item.name === 'default' ? championName + '' : item.name}</Text>
                                <Image style={{ 
                                    width: 306, 
                                    height: 560, 
                                    marginBottom: 5, 
                                    marginTop: 10, 
                                    marginRight: 15,
                                    }} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${item.num}.jpg` }}/>
                            </View>
                        )
                    })}
                </ScrollView>
                
              </View>
          </ScrollView>
         
      </View>
  );
}

export default Champions;