import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme
} from 'react-native';

const DayStats = (props) => {
  const {day, food, weight} = props.dayData;
  const isDarkMode = useColorScheme() === 'dark';


  const foundDateName = day?.date?.toString();
  return (
    <View style={{ alignItems: 'center' }}>
        {/* This is where the graph will go. It will either be a bar chart showing where you calories were allocated, or it will be 
        a graph of your weight to your food intake so you can see patterns */}
    </View>
  );
}

  const styles = StyleSheet.create({

    ProgressBar: {
      alignSelf: 'center',
      alignItems: 'center',
    },
  
    DarkFont: {
      color: "white",
      fontSize: 30,
      paddingTop: 8
    },
  
    LightFont: {
      color: "black",
      fontSize: 30,
      paddingTop: 8
    },
  
  });


export default DayStats;