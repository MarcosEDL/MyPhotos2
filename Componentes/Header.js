import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar'

const Header = ({showNav, navigation, route}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Image source={require('../assets/logo.jpg')} resizeMode="contain" style={styles.image} />
        <Text style={styles.headerText}>Instagram Rosa</Text>
        </View>
        {showNav ?
        <View style={styles.icons}>
            <Pressable onPress={() => navigation.navigate('posts', {uid: route.params.uid})}>
                <Image source={require('../assets/home.png')} resizeMode="contain" style={styles.imageSmall} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('meusPosts', {uid: route.params.uid})}>
                <Image source={require('../assets/profile.png')} resizeMode="contain" style={styles.imageSmall} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('addPost', {uid: route.params.uid})}>
                <Image source={require('../assets/addPost.png')} resizeMode="contain" style={styles.imageSmall} />
            </Pressable>
            <StatusBar style="auto" />
        </View> : null
        }
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#fbb8e1',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fbb8e1',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingHorizontal: 15,
        paddingVertical: 5, 
    },
    image: {
        width: 90,
        height: 90,
        backgroundColor: '#fbb8e1',
    },
    imageSmall: {
        width: 48,
        height: 48, 
    }
});

export default Header;