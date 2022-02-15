import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView, Text, useColorScheme, View } from "react-native";
import * as Progress from 'react-native-progress';
import { Dimensions, StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Line from "../Components/Line";




const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);



    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  return (
    <SafeAreaView style={[backgroundStyle, {height: '100%'}]}>

      <ScrollView style={styles.ScrollViewStyle}>
        <View style={styles.CommonViewStyling}>
          <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}>Breakfast</Text>
          {/* This is where we will pull from VM to find any Breakfast Foods */}
          <>
           {breakfast.length === 0 && <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}> YEET </Text>
           }
          </>

        </View>

        <Line/>

        <View style={styles.CommonViewStyling}>
          <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}>Lunch</Text>
          {/* This is where we will pull from VM to find any Lunch Foods */}

        </View>
        <Line/>



        <View style={styles.CommonViewStyling}>
          <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}>Dinner</Text>
          {/* This is where we will pull from VM to find any Dinner Foods */}

        </View>
        <Line/>


        <View style={styles.CommonViewStyling}>
          <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}>Snacks</Text>
          {/* This is where we will pull from VM to find any snacks */}
        </View>
        <Line/>


      </ScrollView>
      
      

      <View style={styles.ProgressBar}>
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
    position: "absolute",
    padding: 8,
    bottom: 8
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
    maxHeight: "25%",
  }


});


export default HomeScreen;