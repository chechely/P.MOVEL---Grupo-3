import React, {Component} from "react";
import { Text, View, SafeAreaView, StyleSheet, ToastAndroid, Button } from "react-native";


export default function App(){

    function toastDuration() {
        ToastAndroid.show("Duração curta", ToastAndroid.SHORT);    
    }
    function toastDurationGravity () {
        ToastAndroid.showWithGravity("Duração Longa e alinhado em cima", ToastAndroid.LONG, ToastAndroid.TOP);
    }
    function toastDurationGravityOffset (){
        ToastAndroid.showWithGravityAndOffset("Duração longa, alinhado ao centro e com offset 30, 50", ToastAndroid.LONG, ToastAndroid.CENTER, 30, 50);
    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>React Native Toast</Text>
                <View style={styles.button}>
                    <Button onPress={toastDuration} title = "Toast com Duration Curto"/>
                </View>
                <View style={styles.button}>
                    <Button onPress={toastDurationGravity} title= 'Toast com Duration e Gravity' />
                </View>
                <View style={styles.button}>
                    <Button onPress={toastDurationGravityOffset} title = 'Toast com Duration, Gravity e Offset' />
                </View>
            </View>

            
        </SafeAreaView>
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    },
    button:{
        margin: 10,
    }
    
})

