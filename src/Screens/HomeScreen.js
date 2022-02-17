import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Text, useColorScheme, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from 'react-native-progress';
import { Dimensions, StyleSheet, } from 'react-native';
import Line from "../Components/Line";
import { getTodaySpecificFood } from "../../backend/api";
import PlaceholderCalorieView from "../Components/PlaceholderCalorieView";
import { useEffect } from "react";



const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      setBreakfast(getTodaySpecificFood('breakfast'));
      setLunch(getTodaySpecificFood('lunch'));
      setDinner(getTodaySpecificFood('dinner'));
      setSnacks(getTodaySpecificFood('snacks'));
      setLoading(false);
    }, [])




  const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  return (
    <SafeAreaView style={[backgroundStyle, {height: '100%'}]}>
      <View style={{flex: 4}}>
        <ScrollView style={styles.ScrollViewStyle}>
          <View style={styles.CommonViewStyling}>
            <Text style={[isDarkMode ? styles.DarkFont : styles.LightFont, styles.title]}>Breakfast</Text>
            {/* This is where we will pull from VM to find any Breakfast Foods */}
            <>
            {isLoading ? <></> : breakfast.length === 0 && <PlaceholderCalorieView/> ||
            breakfast.length !== 0 && breakfast.map((food, index) => {
              return (
              <View key={index} style={{flexDirection: 'row'}}>
                <Text style={[styles.name, isDarkMode ? styles.DarkFont : styles.LightFont, styles.foodName]}>{food.name}: </Text>
                <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}> {food.calories}</Text>
              </View>
              )
          })}
</>
          </View>

          <Line/>

          <View style={styles.CommonViewStyling}>
            <Text style={[isDarkMode ? styles.DarkFont : styles.LightFont, styles.title]}>Lunch</Text>
            {/* This is where we will pull from VM to find any Lunch Foods */}
            <>
            {lunch.length === 0  && <PlaceholderCalorieView/>}
            </>



          </View>
          <Line/>



          <View style={styles.CommonViewStyling}>
            <Text style={[isDarkMode ? styles.DarkFont : styles.LightFont, styles.title]}>Dinner</Text>
            {/* This is where we will pull from VM to find any Dinner Foods */}

            <>
            {dinner.length === 0  && <PlaceholderCalorieView/>}
            </>

          </View>
          <Line/>


          <View style={styles.CommonViewStyling}>
            <Text style={[isDarkMode ? styles.DarkFont : styles.LightFont, styles.title]}>Snacks</Text>
            {/* This is where we will pull from VM to find any snacks */}

            <>
            {snacks.length === 0  && <PlaceholderCalorieView/>}
            </>

          </View>
          <Line/>


        </ScrollView>
      </View> 

      <View style={[styles.ProgressBar, {flex: 0}]}>
        <Progress.Bar progress={0.3} width = {(4 * Dimensions.get('window').width) / 5} height={20}/>
        <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}> 180/2000 Calories </Text>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  ProgressBar: {
    alignSelf: 'center',
    alignItems: 'center',
  },

  DarkFont: {
    color: "white",
    fontSize: 18,
    paddingTop: 8
  },

  LightFont: {
    color: "black",
    fontSize: 18,
    paddingTop: 8
  },

  ScrollViewStyle: {
    marginLeft: 8,
    marginRight: 8,
  },

  CommonViewStyling: {
    marginBottom: "15%",
    minHeight: "15%",
  },

  title: {
    fontSize: 24,
    marginBottom: 4,
  },

  foodName: {
    fontSize: 28,
  }

});


export default HomeScreen;