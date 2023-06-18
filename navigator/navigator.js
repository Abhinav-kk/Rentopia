import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Prompt from '../screens/Prompt';
import Product from '../screens/Product';
import ImageUpload from '../screens/ImageUpload';
const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.FadeFromBottomAndroid,
                }}>
                {/* <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={Signup} /> */}
                <Stack.Screen name="Prompt" component={Prompt} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Product" component={Product} />
                <Stack.Screen name="ImageUpload" component={ImageUpload} />
                {/* <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Post" component={Post} />
                <Stack.Screen name="Liked" component={Liked} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;