import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { Button, View, Image ,Text} from 'react-native';

export default class KeepAwakeExample extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white' }}>
        <View style={{alignItems: 'center'}}>
        <Image
          style={{ width: 70,height: 110}}
          source={{uri: 'https://www2.ifal.edu.br/o-ifal/comunicacao/arquivos/logos/IFAL_Palmeiradosndios_vertical.png'}}
        />
      </View>

        <Text style={{alignItems: 'center',color:'green', fontSize:26}}>
          Deixar tela ativa 
          finitamente
        </Text>
      <View style={{ margin:10}}>      
        <Button color='green' onPress={this._activate} title="Ativar" />
      </View>
      <View style={{ margin:10}}> 
        <Button color='green' onPress={this._deactivate} title="Desativar" />
      </View>
      </View>
    );
  }

  _activate = () => {
    activateKeepAwake(); 
    alert('Ativado!');
  };

  _deactivate = () => {
    deactivateKeepAwake(); 
    alert('Desativado!');
  };
}

