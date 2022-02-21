import React from 'react';
import { StyleSheet, useColorScheme} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CalendarScreen from './src/Screens/CalendarScreen';
import HomeScreen from './src/Screens/HomeScreen';
import SettingsScreen from './src/Screens/SettingsScreen';

const Tab = createBottomTabNavigator();


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <NavigationContainer style={backgroundStyle}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, color: 'white' },
          headerShown: false,
        }}>
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
        
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({

});

export default App;
