import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { getAllByDate, getToday } from "../../backend/api";
import DayStats from "./DayStats";
import { View } from "react-native";

const CalorieCalendar = () => {
  const today = new Date();
  const [ dayData, setDayData ] = useState(getAllByDate(today));
  const [ currentDate, setCurrentDate ] = useState(today.toISOString().split('T')[0]);
  const [ monthData, setMonthData ] = useState({});

  useEffect(() => {
    setMonthData(getMonthData(today.getMonth(), today.getFullYear()));
  }, [])

  const onDayPress = date => {
    setCurrentDate(date.dateString);
    const {year, month, day} = date;
    const selectedDate = new Date(year, month-1, day);

    setDayData(getAllByDate(selectedDate));
  }

  const getMonthData = (month, year) => {
    const numberOfDays = new Date(year, month+1, 0).getDate();

    const newMonthData = {};

    for (let i = 1; i <= numberOfDays; i++){
      let _date = new Date(year, month, i);
      console.log(`Checking date: ${_date.toDateString()}`)
      const _result = getAllByDate(_date);
      console.log(JSON.stringify(_result));
    }

    setMonthData(newMonthData);

    console.log(JSON.stringify(monthData));
  }

  return (
    <View>
      <Calendar
        markedDates={{
          [currentDate]: {
            selected: true,
            disableTouchEvent: true,
          }
        }}
        onDayPress={onDayPress}
      />
      <DayStats dayData={dayData} date={currentDate} />
    </View>
  );
}

export default CalorieCalendar;