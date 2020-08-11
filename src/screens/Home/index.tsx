import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    Dimensions
 } from 'react-native';
 import { useNavigation } from '@react-navigation/native'

 const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#010101',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: height * 0.65,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 35,
        fontFamily: 'Mada-Medium',   
        marginTop: 40,
        textAlign: 'center',
    },
    button: {
        marginTop: 40,
        backgroundColor: '#d13639',
        width: 177,
        height: 56,
        borderRadius: 56 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 20,
        fontFamily: 'LilyScriptOne-Regular',
        color: '#FFFF'
    },
})

const Home: React.FC = () => {
    const navigation = useNavigation();

    function handleNavigateToChampions() {
        navigation.navigate('Champions');
    }

  return (
    <View style={styles.container}>
        <View>
         <Image style={styles.image} source={require('../../assets/images/riotgames-logo.png')}/>
        </View>
        <Text style={styles.text}>
            Search 
            for 
            league of legends 
            champs
        </Text>

        <TouchableOpacity onPress={handleNavigateToChampions} activeOpacity={0.7} style={styles.button}>
            <Text style={styles.textButton}>Next</Text>
        </TouchableOpacity>
    </View>
  );
}

export default Home;