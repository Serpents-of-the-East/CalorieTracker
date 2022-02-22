import React from "react";
import {
  View,
  Text,
} from 'react-native';

const DayStats = (props) => {
  const {day, food, weight} = props.dayData;

  const foundDateName = day?.date?.toString();
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Stats For</Text>
      <Text>{props.date}</Text>
      {!foundDateName ? 
      <Text>No data was found</Text>
      :
      <Text>Goal: {day.goal}</Text>
      }
    </View>
  );

  }

export default DayStats;