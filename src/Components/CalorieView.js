import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { addFood } from '../../backend/api';
import Line from './Line';

const CalorieView = (props) => {
    return (
        <View style={styles.FoodView} onStartShouldSetResponder={() => console.log(props.text)}>
            <View style={{flexDirection: "row"}}>
                <Text style={[styles.foodText, {flex: 4}]}>{props.text}</Text>
                <Text style={[styles.foodText, {flex: 1}]}>{props.calories}</Text>
            </View>
                <Line />
        </View>
    )
};

const styles = StyleSheet.create({
    foodText: {
        fontSize: 24,
        marginLeft: 8,
        marginBottom: 4,
        color: 'white'
    },

    FoodView: {
        padding: 4,

    },
})


export default CalorieView;