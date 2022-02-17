import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import Line from './Line';

const PlaceholderCalorieView = ({onAddItem}) => {
    return (
        <View style={styles.PlaceHolderView} onStartShouldSetResponder={() => onAddItem({name: "Yeet", calories: 200, category: "breakfast"})}>
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
        color: '#cbdccb',
    },

    PlaceHolderView: {
        padding: 4,

    },
})


export default PlaceholderCalorieView;