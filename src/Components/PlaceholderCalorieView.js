import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { addFood } from '../../backend/api';
import Line from './Line';

const PlaceholderCalorieView = () => {
    return (
        <View style={styles.PlaceHolderView} onStartShouldSetResponder={() => addFood("Test", 200, "breakfast")}>
            <Text style={styles.placeholderText}>Click Here to create food item</Text>
            <Line />
        </View>
    )
};

const styles = StyleSheet.create({
    placeholderText: {
        fontSize: 18,
        marginLeft: 8,
        marginBottom: 4,
        color: 'white'
    },

    PlaceHolderView: {
        padding: 4,

    },
})


export default PlaceholderCalorieView;