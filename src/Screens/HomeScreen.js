import React, { useState, useRef, useEffect } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Text, useColorScheme, View, ScrollView, Button, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from 'react-native-progress';
import { Dimensions, StyleSheet, } from 'react-native';
import { getGoal, getTodaySpecificFood } from "../../backend/api";
import PlaceholderCalorieView from "../Components/PlaceholderCalorieView";
import CalorieView from "../Components/CalorieView";
import { addFood } from '../../backend/api';
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';


const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const CARD_WIDTH =  Dimensions.get('window').width * 0.85;
    const CARD_HEIGHT = Dimensions.get('window').height * 0.7;
    const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10
    const isFocused = useIsFocused();

    const [calories, setCalories] = useState(0);
    const [calorieGoal, setCalorieGoal] = useState(getGoal());
    const [isOverGoal, setIsOverGoal] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const lunchScroll = useRef();
    const dinnerScroll = useRef();

    const [ isEditing, setIsEditing ] = useState({
      breakfast: false,
      lunch: false,
      dinner: false,
    });

    const [ foods, setFoods ] = useState({
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    })

    const endEditing = () => {
      setIsEditing({
        breakfast: false,
        lunch: false,
        dinner: false,
      })
    }
    

    const changeEditing = (mealType, value) => {
      setIsEditing({...isEditing, [mealType]: value})
    }

    useEffect(() => {
      setLoading(true);
      const breakfast = getTodaySpecificFood('breakfast');
      const lunch = getTodaySpecificFood('lunch');
      const dinner = getTodaySpecificFood('dinner');
      const snacks = getTodaySpecificFood('snacks');

      tempCalorieAmount = 0;

      const addSection = section => {
        section.map(calorieAmount => {
          tempCalorieAmount += calorieAmount.calories;
        })
      }

      addSection(breakfast);
      addSection(lunch);
      addSection(dinner);

      setCalories(tempCalorieAmount);

      if (tempCalorieAmount > Number.parseFloat(calorieGoal)) setIsOverGoal(true);
      setFoods({ breakfast, lunch, dinner, snacks })

      setLoading(false);
    }, [])

    useEffect(() => {
      setCalorieGoal(getGoal());

    }, [isFocused])

    const updateMealType = food => {
      addFood(food.name, food.calories, food.category);
      setFoods({...foods, [food.category]: [...foods[food.category], food]})
      setCalories(calories + Number.parseFloat(food.calories))
      if (calories + Number.parseFloat(food.calories) > calorieGoal) setIsOverGoal(true)
      else setIsOverGoal(false);
    }

    

  const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  return (
    <SafeAreaView style={[backgroundStyle, {height: '100%'}]}>
      <View style={{flex: 4}}>
      <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}>
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
            <Text style={{fontSize: 32, color: 'white', fontWeight: 'bold', marginBottom: 32,}}> Breakfast </Text>
            <ScrollView ref={ref => { scrollView = ref }}>
              {isLoading ? <></> :
                foods.breakfast.map((food, index) => {
                  return (
                    <CalorieView key={index} text={food.name} calories={food.calories} time={food.category}/>
                  );
                })
              }
              {isEditing.breakfast ? <PlaceholderCalorieView onAddItem={updateMealType} mealType='breakfast' endEdit={endEditing}/> : null}
            </ScrollView>
            <TouchableOpacity onPress={() => {
                  scrollView.scrollToEnd();
                  changeEditing('breakfast', true)                
                }}>
              <View style={{width: '100%', alignItems: 'flex-start', flexDirection: 'row'}}> 
                <FontAwesomeIcon icon= { faCirclePlus } style={{color: 'white', marginTop: 8}} size={24}/>
                <Button title="Click to add Food"  color='white' ></Button>
              </View>
            </TouchableOpacity>

          </View> 
          <View style={[styles.LunchCard, styles.CommonCard]}>
            <Text style={{fontSize: 32, color: 'white', fontWeight: 'bold', marginBottom: 32}}> Lunch </Text>
            <ScrollView ref={lunchScroll}>
              {isLoading ? <></> :
                foods.lunch.map((food, index) => {
                  return (
                    <CalorieView key={index} text={food.name} calories={food.calories} time={food.category}/>
                  );
                })
              }
              {isEditing.lunch ? <PlaceholderCalorieView onAddItem={updateMealType} mealType='lunch' endEdit={endEditing}/> : null}
            </ScrollView>
            <TouchableOpacity onPress={() => {
                  lunchScroll.current.scrollToEnd();
                  changeEditing('lunch', true)                
                }}>
              <View style={{width: '100%', alignItems: 'flex-start', flexDirection: 'row'}}> 
                <FontAwesomeIcon icon= { faCirclePlus } style={{color: 'white', marginTop: 8}} size={24}/>
                <Button title="Click to add Food"  color='white' ></Button>
              </View>
            </TouchableOpacity>

          </View> 
          <View style={[styles.DinnerCard, styles.CommonCard]}>
            <Text style={{fontSize: 32, color: 'white', fontWeight: 'bold', marginBottom: 32}}> Dinner </Text>
            <ScrollView style={{flex: 3}} ref={dinnerScroll}>
              {isLoading ? <></> :
                foods.dinner.map((food, index) => {
                  return (
                    <CalorieView key={index} text={food.name} calories={food.calories} time={food.category}/>
                  );
                })
              }
              {isEditing.dinner ? <PlaceholderCalorieView onAddItem={updateMealType} mealType='dinner' endEdit={endEditing}/> : null}
            </ScrollView >
            <TouchableOpacity onPress={() => {
                  dinnerScroll.current.scrollToEnd();
                  changeEditing('dinner', true)                
                }}>
              <View style={{width: '100%', alignItems: 'flex-start', flexDirection: 'row'}}> 
                <FontAwesomeIcon icon= { faCirclePlus } style={{color: 'white', marginTop: 8}} size={24}/>
                <Button title="Click to add Food"  color='white' ></Button>
              </View>
            </TouchableOpacity>
          </View> 
        </ScrollView>

          </KeyboardAvoidingView>
        </View>

      <View style={[styles.ProgressBar, {flex: 0}]}>
        <Progress.Bar progress={calories / calorieGoal} width = {(4 * Dimensions.get('window').width) / 5} height={20}
        color={isOverGoal ? '#ff0000' : '#00ff00'}/>
        <Text style={isDarkMode ? styles.DarkFont : styles.LightFont}> {calories.toString()}/{calorieGoal} Calories </Text>
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