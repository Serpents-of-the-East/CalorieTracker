import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { addFood } from '../../backend/api';
import Line from './Line';

const CalorieView = (props) => {
    return (
        <View style={styles.FoodView} onStartShouldSetResponder={() => console.log(props.text)}>
            <Text style={styles.foodText}>{props.text}</Text>
            <Line />
        </View>
    )
};

const styles = StyleSheet.create({
    foodText: {
        fontSize: 18,
        marginLeft: 8,
        marginBottom: 4,
        color: 'white'
    },

    FoodView: {
        padding: 4,

    },
})


export default CalorieView;