import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button, Text } from 'react-native';
import Header from '../Componentes/Header';
import firebase from '../servicos/firebase'
import { getDatabase, ref, update } from "firebase/database"
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage"
import { Picker } from '@react-native-picker/picker'
import * as Location from 'expo-location'

const TelaAddPost = ({navigation, route}) => {
  const [selectedTag, setSelectedTag] = useState('')
  const [availableTags, setAvailableTags] = useState([])
  const [postFailed, setPostFailed] = useState(false)
  const [location, setLocation] = useState(null)

  const image = route.params.image ? route.params.image : null

  //alteração começou aqui
  const uploadImage = async (image, postId) => {
    const storage = getStorage(firebase)
    const imageRef = storageRef(storage, 'images/' + postId + '.jpg')
    const imageData = await fetch(image).then((response) => response.blob())
    const uploadTask = await uploadBytes(imageRef, imageData)
    return getDownloadURL(imageRef);
  }

  const createPost = async (quote, imageUrl, location, uid, postId) => {
    const database = getDatabase(firebase)
    const userRef = ref(database, 'users/' + route.params.uid+"/posts/"+postId)
    return update(userRef, { legenda: quote.content, foto: imageUrl, geolocalizacao: location })
  }

  const savePost = async () => {
    const postId = Date.now().toString()
    let url = '';
    if (selectedTag.length === 0) {
      url = 'https://api.quotable.io/quotes/random';
    } else {
      url = 'https://api.quotable.io/quotes/random?tags=' + selectedTag;
    }

    fetch(url)
      .then((response) => response.json())
      .then(async quoteData => {
        if(quoteData.length > 0) {
          const imageUrl = image ? await uploadImage(image, postId) : ''
          await createPost(quoteData[0], imageUrl, location, route.params.uid, postId);
          console.log('Post criado: ', quoteData[0].content);
          setPostFailed(false);
          navigation.navigate('posts', { uid: route.params.uid });
        } else {
          console.log('Sem citação nessa tag');
          setPostFailed(true);
        }
      })
      .catch(error => {
        setPostFailed(true);
        console.error(error);
      })
  };
  
  const searchTags = () => {
    fetch('https://api.quotable.io/tags')
      .then((response) => response.json())
      .then((data) => {
        setAvailableTags(data);
      })
      .catch((error) => console.error(error));
  }
  const getLocation = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return(<View><Text style={styles.postFailed}>Permissão de Localização Negada!</Text></View>)
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude})
  }
  useEffect(() => {
    searchTags()
    getLocation()
  }, [])
  
  return(
    <View style={styles.container}>
      <Header showNav={true} navigation={navigation} route={route} />
      {postFailed ? <Text style={styles.postFailed}>Falha ao enviar o Post</Text> : null}
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
      <View style={styles.contentContainer}>
        <Button
          onPress={() => {navigation.navigate('camera', {uid: route.params.uid})}}
          title="Tirar Foto"
          color={'#FF1493'}
        />
        <Picker
          selectedValue={selectedTag}
          onValueChange={(itemValue, itemIndex) => setSelectedTag(itemValue)}
        >
          <Picker.Item label="Selecione um tipo de legenda" value="" />
          {availableTags.map((tag) => (
            <Picker.Item key={tag._id} label={tag.name} value={tag.name} />
          ))}
        </Picker>
        <Button
          onPress={savePost}
          title="Gerar post"
          color={'#C71585'}
        />
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbb8e1'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 225,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },  
  image: {
    flex: 1,
    resizeMode: 'contain'
  },
  postFailed: {
    fontWeight: 'bold',
    color: 'red'
  }
});

export default TelaAddPost;