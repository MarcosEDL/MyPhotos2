import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
function TelaCamera({navigation, route}) {
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
    return (
      <View style={styles.container}>
        {hasPermission ? (
          <View style={styles.cameraContainer}>
            {image ? (
              <View style={styles.container}>
                  <Image source={{ uri: image.uri }} style={styles.image}/>
                  <Button
                      color='grey'
                      title="Tirar nova foto"
                      onPress={() => {
                          setImage(null)
                      }}
                  />
                  <Button
                      color='grey'
                      title="Usar essa foto"
                      onPress={() => {
                          navigation.navigate('addPost', {uid: route.params.uid, image: image.uri})
                      }}
                  />
              </View>
            ) : (
              <Camera
                ref={(ref) => setCamera(ref)}
                style={styles.camera}
                type={type}
                ratio='1:1'
              />
            )}
          </View>
        ) : (
          <Text>Permissão da câmera negada!</Text>  
        )}
      {!image && (
          <View>
          <Button
              color='grey'
              title="Trocar Câmera"
              onPress={() => {
              setType(
                  type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
              }}
          />
          <Button title="Tirar Foto" onPress={() => takePicture()} />      
          </View>
        )}
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    }
})

export default TelaCamera