import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView, useColorScheme } from "react-native";
import CalorieCalendar from "../Components/CalorieCalendar";


const CalendarScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  return (
    <SafeAreaView style={[backgroundStyle, {height: '100%'}]}>
      <CalorieCalendar />
    </SafeAreaView>
  )
}

export default CalendarScreen;