import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import Header from '../Componentes/Header';
import {Picker} from '@react-native-picker/picker'

function TelaCamera({navigation, route}) {

    const [zoom, setZoom] = useState(0)
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [hasPermission, setHasPermission] = useState(null)
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back)

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted')
      })();
    }, [route.params]);

    const takePicture = async () => {
      if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data)
      }  
    }

    const switchCamera = () => {
      setType( type === Camera.Constants.Type.back ? 
                            Camera.Constants.Type.front : Camera.Constants.Type.back
      )
    }

    if(!hasPermission) {
      return (
        <View style={styles.container}>
          <Text>Permissão da câmera negada!</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header showNav={false} />
        </View>
        {image ? (
          <View style={styles.container2}>
              <Image source={{ uri: image.uri }} style={styles.image}/>
              <Button
                  color='blue'
                  title="Tirar nova foto"
                  onPress={() => {
                      setImage(null)
                  }}
              />
              <Button
                  title="Usar essa foto"
                  onPress={() => {
                      navigation.navigate('addPost', {uid: route.params.uid, image: image.uri})
                  }}
              />
          </View>
        ) : (
          <View style={styles.container2}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.camera}
              type={type}
              flashMode={flashMode}
              zoom={zoom}
            >
              <View style={styles.BotoesCamera}>
              <Pressable onPress={() => {switchCamera()}}>
                <Image source={require('../assets/changeCamera.png')} style={styles.buttonImage} resizeMode="contain" />
              </Pressable>
              <Pressable onPress={() => {takePicture()}}>
                <Image source={require('../assets/camera.png')} style={styles.buttonImage} resizeMode="contain" />
              </Pressable>
              <View style={styles.zoomButton}>
              <Pressable onPress={() => {setZoom(Math.min(zoom + 0.1, 1.0))}}>
                <Image source={require('../assets/zoom-in.png')} style={styles.buttonImage} resizeMode="contain" />
              </Pressable>
              <Pressable onPress={() => {setZoom(Math.min(zoom - 0.1, 1.0))}}>
                <Image source={require('../assets/zoom-out.png')} style={styles.buttonImage} resizeMode="contain" />
              </Pressable>
                </View>
              </View>
            </Camera>
              <Picker
                  selectedValue={flashMode}
                  onValueChange={(itemValue, itemIndex) => {setFlashMode(itemValue); console.log(flashMode)}}
              >
                <Picker.Item label="Automático" value={Camera.Constants.FlashMode.auto} />
                <Picker.Item label="Ligado" value={Camera.Constants.FlashMode.on} />
                <Picker.Item label="Desligado" value={Camera.Constants.FlashMode.off} />
              </Picker>
          </View>
        )}
      </View>
    )
}
const styles = StyleSheet.create({
    zoomButton: {
      flexDirection: 'column',
    },
    container: {
        flex: 1,
    },
    container2: {
      flex: 0.85,
    },
    header: {
      flex: 0.15
    },
    camera: {
      flex: 1
    },
    BotoesCamera: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: 20,
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    image: {
      flex: 1,
      resizeMode: 'contain'
    },
    buttonImage: {
      width: 35,
      height: 35
    },  
})

export default TelaCamera