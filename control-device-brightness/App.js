import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import * as Brightness from 'expo-brightness';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(1);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
            <View style={styles.logo1}>
        <Image
          style={styles.logo}
          source={{uri: 'https://www2.ifal.edu.br/o-ifal/comunicacao/arquivos/logos/IFAL_Palmeiradosndios_vertical.png'}}
        />
      </View>
      <Text style={styles.text}>Aumenta automaticamente o brilho para 100%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems:'center'
  },
text:{
  fontSize:24,
  color:'green'
},
       logo: {
    width: 70,
    height: 110,
  },
       logo1: {
 alignItems:'center',
  },

});


