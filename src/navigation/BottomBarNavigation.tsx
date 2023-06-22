import FavouriteScreen from '../screens/FavouriteScreen';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/AntDesign';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';

import SettingScreen from '../screens/SettingScreen';
import {RootScreens} from './RootNavigation';

const Tab = createBottomTabNavigator();

export default function BottomTabBarScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: bar =>
            bar.focused ? (
              <Icon name="home" size={25} color={'tomato'} />
            ) : (
              <Icon name="home" size={25} color={'black'} />
            ),
          title: 'Home',

          headerRight: () => (
            <Icon
              name="search1"
              size={25}
              color={'white'}
              style={{marginRight: 15}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{
          tabBarIcon: bar =>
            bar.focused ? (
              <Icon name="hearto" size={25} color={'tomato'} />
            ) : (
              <Icon name="hearto" size={25} color={'black'} />
            ),
          title: 'Favorite',
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: true,
          tabBarIcon: bar =>
            bar.focused ? (
              <Icon name="setting" size={25} color={'tomato'} />
            ) : (
              <Icon name="setting" size={25} color={'black'} />
            ),
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}
