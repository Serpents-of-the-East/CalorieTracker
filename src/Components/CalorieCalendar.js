import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { getAllByDate } from "../../backend/api";


const CalorieCalendar = () => {
  const [ dayData, setDayData ] = useState([]);
  const today = new Date();
  const [ currentDate, setCurrentDate ] = useState(today.toISOString().split('T')[0]);

  const onDayPress = day => {
    setCurrentDate(day.dateString)
  }

  return (
    <Calendar
      markedDates={{
        [currentDate]: {
          selected: true,
          disableTouchEvent: true,
        }
      }}
      onDayPress={onDayPress}
    />
  );
}

export default CalorieCalendar;