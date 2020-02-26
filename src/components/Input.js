import React from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { useState, useEffect } from 'react';

import { height, width } from '../utils/dimensions';

export default function Input({ onChange, value, containerStyle }) {
  const [positionAnim] = useState(new Animated.Value(25));
  const [z_indez, setZ_index] = useState(-5);

  const animFocus = () => {
    Animated.timing(positionAnim, {
      toValue: 0,
      duration: 200,
    }).start();
    setZ_index(5);
  };
  const animBlur = () => {
    if (value !== '') return;
    Animated.timing(positionAnim, {
      toValue: 25,
      duration: 200,
    }).start();
    setZ_index(-5);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: positionAnim.interpolate({
              inputRange: [0, 25],
              outputRange: ['2%', '30%'],
            }),
            fontSize: positionAnim.interpolate({
              inputRange: [0, 25],
              outputRange: [12, 20],
            }),
            zIndex: z_indez,
            color: '#555',
          },
        ]}
      >
        Número binario
      </Animated.Text>
      <TextInput
        style={styles.input}
        onChange={onChange}
        value={value}
        maxLength={8}
        keyboardType="number-pad"
        onFocus={animFocus}
        onBlur={animBlur}
        // placeholder="Número binario"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1
  },
  label: {
    marginLeft: 20,
    paddingHorizontal: 5,
    color: '#666',
    backgroundColor: '#fff',
    alignSelf: 'baseline',
    position: 'absolute',
    // marginTop: 3,
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingLeft: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    color: '#333',
    // elevation: 3,
  },
});
