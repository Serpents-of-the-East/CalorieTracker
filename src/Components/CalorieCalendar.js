import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { getAllByDate, getStatusByDate, getToday } from "../../backend/api";
import DayStats from "./DayStats";
import { View } from "react-native";


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
        case('under'):
          dotColor = 'green';
        default:
          dotColor = 'grey';
      }

      console.log(JSON.stringify(_status));
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

  const onDayPress = date => {
    setCurrentDate(date.dateString);
    const {year, month, day} = date;
    const selectedDate = new Date(year, month-1, day);

    setDayData(getAllByDate(selectedDate));
  }

  return (
    <View>
      <Calendar
        markedDates={{
          ...markedDatesData,
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