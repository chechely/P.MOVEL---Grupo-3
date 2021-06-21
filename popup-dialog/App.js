import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Button,
  Image,
} from 'react-native';

import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const App = () => {
  const [defaultAnimationDialog, setDefaultAnimationDialog] = useState(false);
  const [scaleAnimationDialog, setScaleAnimationDialog] = useState(false);
  const [slideAnimationDialog, setSlideAnimationDialog] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={{uri: 'https://www2.ifal.edu.br/o-ifal/comunicacao/arquivos/logos/IFAL_Palmeiradosndios_vertical.png'}}
        />
      </View>
        <Text style={styles.titleStyle}>
          Popup Dialog
        </Text>
        {}
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={() => setDefaultAnimationDialog(true)}>
          <Text style={styles.buttonTextStyle}>Diálogo de animação padrão</Text>
        </TouchableHighlight>

        {}
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={() => setScaleAnimationDialog(true)}>
          <Text style={styles.buttonTextStyle}>Diálogo de Animação de Escala</Text>
        </TouchableHighlight>

        {}
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={() => setSlideAnimationDialog(true)}>
          <Text style={styles.buttonTextStyle}>Diálogo de animação de slide</Text>
        </TouchableHighlight>

        <Dialog
          onDismiss={() => {
            setDefaultAnimationDialog(false);
          }}
          width={0.5}
          visible={defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title="Poup dialog simples"
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCELAR"
                bordered
                onPress={() => {
                  setDefaultAnimationDialog(false);
                }}
                key="button-1"
              />
              <DialogButton
                text="OK"
                bordered
                onPress={() => {
                  setDefaultAnimationDialog(false);
                }}
                key="button-2"
              />
            </DialogFooter>
          }>
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}>
            <Text>Poup dialog com caixa de texto</Text>
          </DialogContent>
        </Dialog>

        <Dialog
          onTouchOutside={() => {
            setScaleAnimationDialog(false);
          }}
          width={0.9}
          visible={scaleAnimationDialog}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            setScaleAnimationDialog(false);
            console.log('onHardwareBackPress');
            return true;
          }}
          dialogTitle={
            <DialogTitle
              title="Diálogo de Animação de Escala"
              hasTitleBar={false}
            />
          }
          actions={[
            <DialogButton
              text="liberar"
              onPress={() => {
                setScaleAnimationDialog(false);
              }}
              key="button-1"
            />,
          ]}>
          <DialogContent>
            <View>
              <Text>
                Diálogo de Animação de Escala
              </Text>
              <Button
                title="Close"
                onPress={() => {
                  setScaleAnimationDialog(false);
                }}
                key="button-1"
              />
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          onDismiss={() => {
            setSlideAnimationDialog(false);
          }}
          onTouchOutside={() => {
            setSlideAnimationDialog(false);
          }}
          visible={slideAnimationDialog}
          dialogTitle={<DialogTitle title="Diálogo de Animação de slide" />}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
          <DialogContent>
            <Text>
            Diálogo de Animação de slide
            </Text>
          </DialogContent>
        </Dialog>

      </View>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  buttonStyle: {
    minWidth: '100%',
    padding: 10,
    backgroundColor: 'green',
    margin: 15,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',rginTop: 10,
  },
    logo: {
    width: 70,
    height: 110,
  },
});
