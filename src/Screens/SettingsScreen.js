import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Text, useColorScheme, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToday, changeToday } from "../../backend/api";
import { ScrollView, TextInput } from "react-native-gesture-handler";


const SettingsScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [today, setToday] = useState(getToday());
    const [calorieGoal, setCalorieGoal] = useState(today.day.goal)
    const [todayCalorieGoal, setTodayCalorieGoal] = useState(today.day.goal)
    
    const styles = StyleSheet.create({
      input: {
        alignSelf: 'center',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '60%',
        marginBottom: 24,
        borderColor: isDarkMode ? 'white' : 'black',
        color: isDarkMode ? 'white' : 'black',
      },
      text: {
        color: isDarkMode ? 'white' : 'black',
        fontSize: 24,
        textAlignVertical: 'center',
        textAlign: 'center',
      }
    });



    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  return (
    <SafeAreaView style={[backgroundStyle, {height: '100%'}]}>
      <ScrollView>
          <Text style={styles.text}>Set Calorie Goal: </Text>

          <TextInput
            value={calorieGoal.toString()}
            onChangeText={calorieGoal => setCalorieGoal(calorieGoal)}
            placeholder="Enter your calorie goal"  
            style={styles.input}
            keyboardType="numeric"
          />
      </ScrollView>




      <Button 
          title="Save Settings"
          onPress={() => {
            console.log(today.day.goal);
            console.log(calorieGoal);
            setTodayCalorieGoal(calorieGoal)
            changeToday(Number.parseFloat(calorieGoal));
          }}
        />    

    </SafeAreaView>
  )
}




export default SettingsScreen;