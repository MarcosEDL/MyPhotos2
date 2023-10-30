import React, {useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../servicos/firebase';
import Header from "../Componentes/Header";
const TelaLogin = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginFailed, setLoginFailed] = useState(false)

    const handleLogin = () => {
        const auth = getAuth(firebase)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoginFailed(false)
                console.log('Usuário logado com sucesso:', userCredential.user.email);
                navigation.navigate('posts' , {uid: userCredential.user.uid})
            })
            .catch((error) => {
                setLoginFailed(true)
                console.error('Erro ao fazer login:', error.message)
            })
    }

return (
    <View style={styles.container}>
        <Header />
        <View style={styles.container2}>
            <Text style={styles.header}>Login</Text>
            {loginFailed && <Text style={styles.loginFailed}>Usuário ou senha inválidos</Text>}
            <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
            <Pressable onPress={() => navigation.navigate('addUser')}>
                <Text style={styles.register}>Registrar novo Usuário</Text>
            </Pressable>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    register: {
        textDecorationLine: 'underline',
        color: 'blue'
    },
    container: {
        flex: 1
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    loginFailed: {
        color: 'red'
    }
});

export default TelaLogin;