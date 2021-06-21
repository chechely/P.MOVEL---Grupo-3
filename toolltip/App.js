import * as React from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import {Tooltip} from 'react-native-elements';

export default function App(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>ToolTip</Text>

      <Tooltip popover={<Text>Isso é o Tooltip</Text>} backgroundColor= "#836FFF" >
          <Text style={styles.textContent}>Clique sobre mim</Text>
      </Tooltip>

    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20
    },
    textContent:{
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: '#483D8B',
      padding: 10,
      borderRadius: 10,
    }
    
    
})