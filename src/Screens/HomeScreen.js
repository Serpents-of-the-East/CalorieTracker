import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Text, useColorScheme, View, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from 'react-native-progress';
import { Dimensions, StyleSheet, } from 'react-native';
import { getTodaySpecificFood } from "../../backend/api";
import PlaceholderCalorieView from "../Components/PlaceholderCalorieView";
import { useEffect } from "react";
import CalorieView from "../Components/CalorieView";
import { addFood } from '../../backend/api';



const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const CARD_WIDTH =  Dimensions.get('window').width * 0.85;
    const CARD_HEIGHT = Dimensions.get('window').height * 0.7;
    const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10
    

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


    const updateBreakfast = food => {
      addFood(food.name, food.calories, food.category);
      setBreakfast([...breakfast, food]);
    }

    const updateLunch = food => {
      addFood(food.name, food.calories, food.category);
      setLunch([...lunch, food]);
    }

    const updateDinner = food => {
      addFood(food.name, food.calories, food.category);
      setDinner([...dinner, food]);
    }

  const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  return (
    <SafeAreaView style={[backgroundStyle, {height: '100%'}]}>
      <View style={{flex: 4}}>
        <ScrollView 
          horizontal={true} 
          pagingEnabled={true}
          scrollEnabled={true}
          decelerationRate={0} 
          snapToInterval={CARD_WIDTH + 10}
          snapToAlignment='center'
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
          }}
          >
          <View style={[styles.BreakfastCard, styles.CommonCard]}>
            <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 8,}}> Breakfast </Text>
            <ScrollView>
              {isLoading ? <></> :
                breakfast.map((food, index) => {
                  return (
                    <CalorieView key={index} text={food.name} calories={food.calories} time={food.category}/>
                  );
                })
              }
              <PlaceholderCalorieView onAddItem={updateBreakfast}/>
            </ScrollView>
            <Button style={{flex: 1}} title="Click to add Food"></Button>

          </View> 
          <View style={[styles.LunchCard, styles.CommonCard]}>
            <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}> Lunch </Text>
            <ScrollView>
              {isLoading ? <></> :
                lunch.map((food, index) => {
                  return (
                    <CalorieView key={index} text={food.name} calories={food.calories} time={food.category}/>
                  );
                })
              }
              <PlaceholderCalorieView onAddItem={updateLunch}/>
            </ScrollView>
            <Button style={{flex: 1}} title="Click to add Food"></Button>

          </View> 
          <View style={[styles.DinnerCard, styles.CommonCard]}>
            <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}> Dinner </Text>
            <ScrollView style={{flex: 3}}>
              {isLoading ? <></> :
                dinner.map((food, index) => {
                  return (
                    <CalorieView key={index} text={food.name} calories={food.calories} time={food.category}/>
                  );
                })
              }
              <PlaceholderCalorieView onAddItem={updateDinner}/>
            </ScrollView>
            <Button style={{flex: 1}} title="Click to add Food"></Button>
          </View> 
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
  CommonCard: {
    flex: 1,
    margin: 5,
    padding: 8,
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.7,
  },


  BreakfastCard: {

    backgroundColor: '#FF7F7F',

  },

  LunchCard: {
    backgroundColor: '#7f7fff',
  },

  DinnerCard: {
    backgroundColor: '#ff7fff',
  },

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