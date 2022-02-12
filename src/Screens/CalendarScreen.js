import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView, Text, useColorScheme } from "react-native";

const CalendarScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  return (
    <SafeAreaView style={[backgroundStyle, {height: '100%'}]}>
      <Text> Calendar Screen</Text>
    </SafeAreaView>
  )
}

export default CalendarScreen;