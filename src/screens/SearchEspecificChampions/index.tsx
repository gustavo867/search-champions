import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { 
    View, 
    Text, 
    TextInput, 
    Image, 
    Dimensions, 
    TouchableOpacity,
    StyleSheet,
    ScrollView, 
    SafeAreaView
    } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

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
        color: '#010101',
        marginTop: 2,
        marginLeft: 2,
    },
    input: { 
        marginTop: 20, 
        width: '60%', 
        alignItems: 'center',
        backgroundColor: '#FFFFFF', 
        borderRadius: 27, 
        borderColor: '#D9D0E3' , 
        borderWidth: 2, 
        height: 47, 
        flexDirection: 'row',
        marginLeft: 5,
    },
    image: {
        width: 120, 
        height: 120, 
        marginTop: 20, 
        marginBottom: 20,
    },
    textChampionName: {
        fontFamily: 'Mada-Medium',
        color: '#010101',
        fontSize: 24,
        marginBottom: 5,
    },
    textChampionDescription: {
        fontFamily: 'Mada-Regular',
        fontSize: 17,
        color: '#010101',
        textAlign: 'left',
        marginLeft: 21,
    },
    textAttack: {
        color: 'red',
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
        color: '#D4C2FF',
        fontFamily: 'Mada-Regular',
        fontSize: 18,
        marginLeft: 21,
    },
    textDifficulty: {
        color: '#04BF58',
        fontFamily: 'Mada-Regular',
        fontSize: 18,
        marginLeft: 21,
    },
    textTag: {
        fontFamily: 'Mada-Bold',
        color: '#010101',
        fontSize: 35,
        marginTop: 20,
        marginLeft: 20,
    },
    skinsName: {
        fontFamily: 'Mada-Medium',
        fontSize: 18,
        color: '#010101',
        width: 300,
        marginLeft: 40,
    },
    abilityText: {
       fontFamily: 'Mada-Regular',
       fontSize: 18,
       color: '#010101',
       marginLeft: 10,
       marginBottom: 20,
       marginRight: 10,
    },
})

const SearchEspecificChampions: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { name } = route.params as any

    const [data, setData] = useState([])

    const [isPress, setIsPress] = useState(false);
    const [championName, setChampionName] = useState(name);
    const [championTitle, setChampionTitle] = useState('A Espada darkin');
    const [championDescription, setChampionDescription] = useState('');
    const [tags, setTags] = useState(['']);
    const [skins, setSkins] = useState<Params>([''])

    const [infoAttack, setInfoAttack] = useState('');
    const [infoDefense, setInfoDefense] = useState('');
    const [infoMagic, setInfoMagic] = useState('');
    const [infoDifficulty, setInfoDifficulty] = useState('');

    const [speel, setSpeel] = useState(['']);

    async function getChampions() {
        await axios.get(`https://ddragon.leagueoflegends.com/cdn/10.15.1/data/pt_BR/champion/${championName}.json`).then(response => {
            const data = response.data['data']

            const champion = data[championName].name
            const description = data[championName].lore
            const title = data[championName].title
            const tags = data[championName].tags
            const skins = data[championName].skins

            const championInfoAttack = data[championName].info.attack
            const championInfoDefense = data[championName].info.defense
            const championInfoMagic = data[championName].info.magic
            const championInfoDifficulty = data[championName].info.difficulty

            const ability = data[championName].spells

            setChampionName(champion);
            setChampionDescription(description);
            setTags(tags)
            setSkins(skins)
            setSpeel(ability)
            setChampionTitle(title)

            setInfoAttack(championInfoAttack);
            setInfoDefense(championInfoDefense);
            setInfoMagic(championInfoMagic);
            setInfoDifficulty(championInfoDifficulty);

            console.log()
        })
    }  
            
 

    function handleSubmit() {
        getChampions()
    }

    function handlePress() {
        setIsPress((prevState) => !prevState)
    }

    function handleNavigateBack() {
       navigation.goBack();
    }

    if (data === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0101' }}>
                <Text>Loading...</Text>
            </View>
        )
    }

  return (
      <SafeAreaView style={{ flex: 1,  backgroundColor: '#0101', paddingTop: 20,  }}>
          <StatusBar style="dark"/>
        
       
            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Image style={{ marginTop: 35, marginLeft: 15, marginRight: 10, }} source={require('../../assets/images/back.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.input}>
                    <Ionicons style={{ marginLeft: 25, marginRight: 20, }} name="ios-search" size={28} color="#2D0C57" />
                    <TextInput
                        placeholder="Search"
                        value={championName}
                        onChangeText={setChampionName}  
                        style={{ color: '#2D0C57', fontSize: 17, }}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{ 
                    marginLeft: 10, 
                    width: 110, 
                    height: 47, 
                    backgroundColor: '#d13639', 
                    borderRadius: 24, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginTop: 20,
                    marginRight: 10,
                    }} onPress={handleSubmit} >
                    <Text>Search</Text>
                </TouchableOpacity>
                    
            </View>
          
          <ScrollView style={{ marginTop: 10 , width: width, }}>

              <View style={{ alignItems: 'center', justifyContent: 'center', }}>

                <Text style={styles.textChampionName}>{championName} {championTitle}</Text>
                <Text numberOfLines = { isPress ? 30 : 3 } ellipsizeMode = 'tail' style={styles.textChampionDescription}>{championDescription}</Text>

                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.text}>{isPress ? 'Minimize' : 'Read More' }</Text>
                </TouchableOpacity>

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

            </View>

                <ScrollView nestedScrollEnabled={true} alwaysBounceHorizontal={true} decelerationRate="fast" showsHorizontalScrollIndicator={false} horizontal={true}>
                    {skins.map((item: any, index: any) => {
                        return (
                            <View key={index} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, }}> 
                                <Text numberOfLines = { 1 } ellipsizeMode = 'tail' style={styles.skinsName}>{item.name === 'default' ? championName + '' : item.name}</Text>
                                <Image style={{ 
                                    width: 306, 
                                    height: 560, 
                                    marginBottom: 5, 
                                    marginTop: 10, 
                                    alignSelf: 'center',
                                    borderRadius: 12,
                                    }} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${item.num}.jpg` }}/>
                            </View>
                        )
                    })}
                </ScrollView>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {speel.map((item: any, index) => {
                        return (
                            <View key={index} style={{ flexDirection: "row",  marginLeft: 20, alignItems: 'center', justifyContent: 'center' }}>  
                                <Image style={{ width: 64, height: 64, marginTop: 12, marginBottom: 20, borderRadius: 64 / 2, }} source={{
                                        uri: `https://ddragon.leagueoflegends.com/cdn/10.15.1/img/spell/${item.id}.png` }}/>
                                <Text style={styles.abilityText}>{item.name}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
              
          </ScrollView>
         
      </SafeAreaView>
  );
}

export default SearchEspecificChampions;