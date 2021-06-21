import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';

const App = () => {
  const _openAppSetting = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
            <View>
        <Image
          style={styles.logo}
          source={{uri: 'https://www2.ifal.edu.br/o-ifal/comunicacao/arquivos/logos/IFAL_Palmeiradosndios_vertical.png'}}
        />
      </View>

        <Text style={styles.titleText}>
          Configurações do aplicativo
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={_openAppSetting}>
          <Text style={styles.buttonTextStyle}>
            Abrir configurações
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 35,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    color: 'green',
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
      logo: {
    width: 70,
    height: 110,
  },

});
export default App;



