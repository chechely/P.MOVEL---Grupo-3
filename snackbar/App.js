import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style = {styles.title}>SnackBar</Text>
      <Button style={styles.botao} onPress={onToggleSnackBar}>{visible ? 'Esconder' : 'Mostrar'}</Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fechar',
          onPress: () => {
            //alguma ação
          },
        }} 
        theme ={{
          colors: {
            onSurface: "#4B0082",
            accent: '#FFF'
          },
        }}>
        Isto é uma SnackBar
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50
  },
  botao:{
    backgroundColor: '#E6E6FA',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
});

export default MyComponent;