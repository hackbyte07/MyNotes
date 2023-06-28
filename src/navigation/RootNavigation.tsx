import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import SplashScreen from '../screens/SplashScreen';
import BottomTabBarScreen from './BottomBarNavigation';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import NotesScreen from '../screens/NotesScreen';
import SavedNotesScreen from '../screens/SavedNotesScreen';
import {initialStateType} from '../redux/slice/notesSlice';

type RootScreens = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  BottomTabBarScreen: undefined;
  NotesScreen: undefined;
  SavedNotesScreen: {note: initialStateType};
};

const Stack = createStackNavigator<RootScreens>();

const RootNavigation = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });

    return subscriber;
  }, []);

  //Splash screen while firebase is loading
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="BottomTabBarScreen"
              component={BottomTabBarScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Group screenOptions={{headerShown: true}}>
              <Stack.Screen
                name="NotesScreen"
                component={NotesScreen}
                options={{title: 'Notes'}}
              />
              <Stack.Screen
                name="SavedNotesScreen"
                component={SavedNotesScreen}
                options={{title: 'Notes'}}
              />
            </Stack.Group>
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen
              name="BottomTabBarScreen"
              component={BottomTabBarScreen}
            />
            <Stack.Group screenOptions={{headerShown: true}}>
              <Stack.Screen
                name="NotesScreen"
                component={NotesScreen}
                options={{title: 'Notes'}}
              />
              <Stack.Screen
                name="SavedNotesScreen"
                component={SavedNotesScreen}
                options={{title: 'Notes'}}
              />
            </Stack.Group>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
export type {RootScreens};
