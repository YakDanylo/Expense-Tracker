import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/COLORS';

const CustomDeleteButton = ({ title, onPress}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      android_ripple={{ color: 'white'}}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft:40,
    width: 100,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 7,
    backgroundColor: "red",
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDeleteButton;