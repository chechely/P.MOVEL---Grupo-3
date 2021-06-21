import React, { Component } from 'react';
import { StyleSheet, View, Vibration, Button, Image } from 'react-native';


const DURATION = 2000;


export default class Mynewproject extends Component {
  
  StartVibrationFunction = () => {
    Vibration.vibrate(DURATION);
  };

  render() {
    return (
      <View style={styles.MainContainer}>
                  <View>
        <Image
          style={styles.logo}
          source={{uri: 'https://www2.ifal.edu.br/o-ifal/comunicacao/arquivos/logos/IFAL_Palmeiradosndios_vertical.png'}}
        />
      </View>

        <View style={{ margin: 10 }}>
          <Button
            title="Vibrar"
            color="green"
            onPress={this.StartVibrationFunction}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center', 
    alignItems:'center',
    flex: 1,
    backgroundColor: 'white',
  },
     logo: {
    width: 70,
    height: 110,
  },

});


