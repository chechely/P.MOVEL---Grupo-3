//Barra de classificação por estrelas personalizada

import React, { Component } from 'react';
//importando.... 
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  //a opacidade da View é diminuída de maneira gradual, diminuindo assim a sua intensidade.
  TouchableOpacity,
} from 'react-native';

 // Exportando componente

export default class Myapp extends Component<{}> {
  constructor() {
    super();
    //
    this.state = {
       // Para definir a quantidade de corações padrão que já será selecionada no começo da execução. 
       Default_Rating: 0,
    // Para definir o número máximo de corações 
      Max_Rating: 5,
    };


  // Caminhos para as fotinhas de corações 
   
//Coraçãp pŕeenchido

    this.Star = 'https://w7.pngwing.com/pngs/495/745/png-transparent-heart-green-graphy-hearts-love-blue-white.png';

    //Coração vazio
    this.Star_With_Border = 'https://w7.pngwing.com/pngs/1012/524/png-transparent-line-angle-leaf-philosophy-heart-and-arrow-love-angle-leaf.png';
  }

  UpdateRating(key) {
    this.setState({ Default_Rating: key });
  // Mantendo a classificação selecionada no estado atual da execução 
  }
  render() {
    let React_Native_Rating_Bar = [];
   // Array para guardar aos corações preenchidos ou vazios
    for (var i = 1; i <= this.state.Max_Rating; i++) {

      React_Native_Rating_Bar.push(
        <TouchableOpacity

          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
    }
    return (

      <View style={styles.MainContainer}>

        <Text style={styles.textStyle}>Como foi sua experiencia com o ensino remoto emergencial oferecido pelo IFAL</Text>
        <Text style={styles.textStyleSmall}>Nos avalie :)</Text>
        {/*View para mostrar os coraçoes*/}
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
        
        <Text style={styles.textStyle}> 
        {/* Para mostrar a avaliação selecionada*/}
          {this.state.Default_Rating} / {this.state.Max_Rating}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => alert 
          ("Obrigado pela avaliação!", this.state.Default_Rating)}>
          {/*Clicando no botão e exigindo alert*/}
          <Text>Enviar avaliação</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'andoid' ? 20 : 0,
    borderColor: 'green',
    borderWidth: 8,
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#32CD32',
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    marginTop: 15,
  },
});

