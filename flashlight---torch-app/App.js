import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Torch from 'react-native-torch';

const App = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);

  const handlePress = () => {
    Torch.switchState(!isTorchOn);
    setIsTorchOn(!isTorchOn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.logo1}>
        <Image
          style={styles.logo}
          source={{uri: 'https://www2.ifal.edu.br/o-ifal/comunicacao/arquivos/logos/IFAL_Palmeiradosndios_vertical.png'}}
        />
      </View>

  <Text style={styles.titleText}>
          Lanterna
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={handlePress}>
          <Text style={styles.buttonTextStyle}>
            {isTorchOn ? 'Desligar' : 'Ligar'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'green',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'green',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
       logo: {
    width: 70,
    height: 110,
  },
       logo1: {
 alignItems:'center',
  },
});
