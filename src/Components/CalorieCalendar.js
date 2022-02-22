import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as Progress from 'react-native-progress';
import { getAllByDate, getStatusByDate, getToday } from "../../backend/api";
import DayStats from "./DayStats";
import { View, useColorScheme, StyleSheet, Dimensions, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const getMonthData = (month, year) => {
  const numberOfDays = new Date(year, month+1, 0).getDate();


  let newMonthData = {};
  let markedDatesData = {};

  for (let i = 1; i <= numberOfDays; i++){
    let _date = new Date(year, month, i);
    const _result = getAllByDate(_date);
    const _status = getStatusByDate(_date);

    const _resultFound = _result?.day?.date;

    if (_resultFound){

      let dotColor;
      switch(_status.status){
        case('over'):
          dotColor = 'red';
          break;
        case('under'):
          dotColor = 'green';
          break;
        default:
          dotColor = 'grey';
          break;
      }

      //console.log(JSON.stringify(_status.status));
      newMonthData = {...newMonthData, [_date.toISOString().split('T')[0]]: _result};  
      markedDatesData = {...markedDatesData, [_date.toISOString().split('T')[0]]: {marked: true, dotColor}}    
    }

  }

  return markedDatesData;

}

const CalorieCalendar = () => {
  const today = new Date();
  const [ dayData, setDayData ] = useState(getAllByDate(today));
  const [ currentDate, setCurrentDate ] = useState(today.toISOString().split('T')[0]);
  const [ markedDatesData, setMarkedDatesData ] = useState(getMonthData(today.getMonth(), today.getFullYear()));
  const isDarkMode = useColorScheme() === 'dark';
  const [ totalCalories, setTotalCalories ] = useState(0);
  const [{key, theme}, setTheme] = useState({key: 'dark', theme: {
          calendarBackground: isDarkMode ? Colors.darker : Colors.lighter,
          dayTextColor: isDarkMode ? Colors.lighter : Colors.darker,
          monthTextColor: isDarkMode ? Colors.lighter : Colors.darker,
  }})
  
  useEffect(() => {
    let calories = 0;

    console.log(dayData.food);

    setTotalCalories(calories);

  }, [dayData])

  useEffect(() => {
    setTheme({key:isDarkMode ? 'dark' : 'light', theme: {
      calendarBackground: isDarkMode ? Colors.darker : Colors.lighter,
      dayTextColor: isDarkMode ? Colors.lighter : Colors.darker,
      monthTextColor: isDarkMode ? Colors.lighter : Colors.darker,
    }})
  }, [isDarkMode])


  const onDayPress = date => {
    setCurrentDate(date.dateString);
    const {year, month, day} = date;
    const selectedDate = new Date(year, month-1, day);

    setDayData(getAllByDate(selectedDate));
  }

  return (
    <View>
      <Calendar
        key={key}
        markedDates={{
          ...markedDatesData,
          [currentDate]: {
            selected: true,
            disableTouchEvent: true,
          }
        }}
        onDayPress={onDayPress}
        theme={theme}
      />
      <View style={{height: '54%'}}>
        <ScrollView>
          <DayStats dayData={dayData} date={currentDate} />
        </ScrollView>

        <View style={[styles.ProgressBar]}>
          <Progress.Bar progress={totalCalories / dayData.day.goal} width = {(4 * Dimensions.get('window').width) / 5} height={20}
          />
          <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}> {totalCalories}/{dayData.day.goal} Calories </Text>
        </View>
      </View>

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
    fontSize: 18,
    paddingTop: 8
  },

  LightFont: {
    color: "black",
    fontSize: 18,
    paddingTop: 8
  },

});


export default CalorieCalendar;