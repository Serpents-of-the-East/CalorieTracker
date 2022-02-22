import React, { useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Line from './Line';

const PlaceholderCalorieView = ({onAddItem, mealType, endEdit}) => {
    const [foodText, setFoodText] = useState("");
    const [calorieCount, setCalorieCount] = useState('');

    return (
        <TouchableWithoutFeedback style={styles.PlaceHolderView} onBlur={() => {
            if (foodText === '' && calorieCount === '')
            {
                endEdit();
            }

            if (foodText !== '' && calorieCount !== ''){
                onAddItem({name: foodText, calories: Number.parseFloat(calorieCount), category: mealType})
                endEdit();
            }


        }}>
            <View>
                <View style={{flexDirection: "row"}}>
                    <TextInput 
                        value={foodText}
                        onChangeText={foodText => setFoodText(foodText)}
                        placeholder="Raw Chicken Breast"
                        style={[styles.placeholderText, {flex:4}]}
                        autoFocus
                        />
                    <TextInput
                        value={calorieCount}
                        onChangeText={calorieCount => setCalorieCount(calorieCount)}
                        placeholder="150"
                        style={[styles.placeholderText, {flex: 1}]}
                        keyboardType="numeric"
                        
                    />
                    </View>
                <Line />
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    placeholderText: {
        fontSize: 24,
        marginLeft: 8,
        marginBottom: 4,
        color: 'white',
    },

    PlaceHolderView: {
        padding: 4,
        marginTop: 8,

    },
})


export default PlaceholderCalorieView;