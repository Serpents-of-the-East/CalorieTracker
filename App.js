import React from 'react';
import { StyleSheet, useColorScheme} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CalendarScreen from './src/Screens/CalendarScreen';
import HomeScreen from './src/Screens/HomeScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faCalendar, faGear } from "@fortawesome/free-solid-svg-icons";

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
          <Tab.Screen name="Home" component={HomeScreen} 
            options={{ 
              tabBarLabel: "Home",
              tabBarLabelStyle: styles.size,
              tabBarIcon: ({ color }) => ( <FontAwesomeIcon size={24} color={isDarkMode ? styles.darkColor.color : styles.lightColor.color} icon={faHouse}></FontAwesomeIcon>) }} />
          <Tab.Screen name="Calendar" component={CalendarScreen} options={{ 
              tabBarLabel: "Calendar",
              tabBarLabelStyle: styles.size,
              tabBarIcon: ({ color }) => ( <FontAwesomeIcon size={24} color={isDarkMode ? styles.darkColor.color : styles.lightColor.color} icon={faCalendar}></FontAwesomeIcon>) }} />
          <Tab.Screen name="Settings" component={SettingsScreen}options={{ 
              tabBarLabel: "Settings",
              tabBarLabelStyle: styles.size,
              tabBarIcon: ({ color }) => ( <FontAwesomeIcon size={24} color={isDarkMode ? styles.darkColor.color : styles.lightColor.color} icon={faGear}></FontAwesomeIcon>) }} />
        </Tab.Navigator>
        
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  darkColor: {
    color: '#D3D3D3'
  },

  lightColor: {
    color: '#494F55',
  },

  size: {
    fontSize: 12,
  }


});

export default App;
