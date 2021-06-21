import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

const App = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Espere! "," Tem certeza que deseja voltar?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "Cancel"
        },
        { text: "SIM", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Clique no botão Voltar!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default App;