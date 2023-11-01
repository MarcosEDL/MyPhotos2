import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './Telas/TelaLogin';
import TelaAddUser from './Telas/TelaAddUser';
import TelaPosts from './Telas/TelaPosts';
import TelaMeusPosts from './Telas/TelaMeusPosts';
import TelaAddPost from './Telas/TelaAddPost';
import TelaCamera from './Telas/TelaCamera';
import TelaLocalizacao from './Telas/TelaLocalizacao';

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={TelaLogin}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="posts"
          component={TelaPosts}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="meusPosts"
          component={TelaMeusPosts}
          options={{ headerShown: false }}
        />
        <Stack.Screen  
          name="addPost"
          component={TelaAddPost}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addUser"
          component={TelaAddUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="camera"
          component={TelaCamera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="localizacao"
          component={TelaLocalizacao}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}