import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Button, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function TabThreeScreen() {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const event = new Date();

    console.log('handleBarCodeScanned() - ' + (event.toLocaleString('en-GB', { timeZone: 'America/New_York' })) )
    console.log(type)
    console.log(data)
    setModalVisible(true);
    //TODO: MCADET - Logic to switch screens go here

    setTimeout(function(){
      setScanned(false);
      setModalVisible(false);
      
    }, 1500);
   // alert(`Bar code wittth type ${type} and data ${data} has been scanned!`);
  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        type={BarCodeScanner.Constants.Type.front}
      />
      {modalVisible && <Modal><Text>{'This is a test'}</Text></Modal>}
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
