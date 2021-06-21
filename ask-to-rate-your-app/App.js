//Peça para avaliar seu aplicativo

//O useState nos permite manter o state local em um componente de função.

import React, {useState, useEffect} from 'react';

// importando todos os componentes que vamos usar
import {
 
  Platform,
  StyleSheet,
  View,
  Linking,
  //a opacidade da View é diminuída de maneira gradual, diminuindo assim a sua intensidade.
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';


const App = () => {

  //Declarando variavéis 


  const startRatingCounter = () => {
   
          Alert.alert(
          "Nos avalie",
             'Isso vai nos ajudar e trará motivações. ',
            [
              {text: 'Vamos lá', onPress: () => openStore()},
              {
                text: 'Não, obrigado!',
                onPress: () => console.log('Não, obrigado! Presionado'),
                style: 'cancel',
              },
            ],
            
          );
     
  };

  const openStore = () => {
    //Link para o app do ifal
 
     Linking.openURL(
        'https://play.google.com/store/apps/details?id=br.gov.ifalmobile',
       ).catch((err) => alert('Por favor, verifique na App Store'));

  };


 
  return (
    
    <View style={styles.container}>
  
      <View style={styles.container}>
     
        <Text style={styles.titleText}>
          Avaliação de aplicativo desenvolvido pelo IFAL 
        </Text>
      
          <TouchableOpacity
            onPress={startRatingCounter}
            activeOpacity={0.6}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
            Ir para avaliação
            </Text>
          </TouchableOpacity>
        
        
      </View>
      
    </View>
    
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: '#008000',
    borderRadius: 20,
    borderWidth: 2
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 15,
    marginTop: 30,
    textAlign: 'center',
  },
  buttonStyle: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#008000',
    borderRadius: 7,
    marginTop: 20,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});