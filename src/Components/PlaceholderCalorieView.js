import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { addFood } from '../../backend/api';
import Line from './Line';

const PlaceholderCalorieView = () => {
    return (
        <View onStartShouldSetResponder={() => addFood("Test", 200, "breakfast")}>
            <Text style={styles.placeholderText}>Click Here to create food item</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    placeholderText: {
        fontSize: 14,
        color: 'lightgrey'
    }
})


export default PlaceholderCalorieView;