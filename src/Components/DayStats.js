import React from "react";
import {
  View,
  Text,
} from 'react-native';

const DayStats = (props) => {
  const {day, food, weight} = props.dayData;

  const foundDateName = day?.date?.toString();

  if (!foundDateName){
    return (
      <View>
        <Text>Stats For</Text>
        <Text>{props.date}</Text>
        <Text>No data was found</Text>
      </View>
    );
  }

  return(
    <View>
      <Text>Stats For</Text>
      <Text>{props.date}</Text>
      <Text>Goal: {day.goal}</Text>
    </View>
  )
}

export default DayStats;