import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Input from './components/Input';

export default function Main() {
  const [decimal, setDecimal] = useState('');
  const [binario, setBinario] = useState('');

  function binToDec({ nativeEvent: { text } }) {
    const numBin = text.replace(/([^0-1])/g, '');
    setBinario(numBin);

    if (numBin.length === 0) {
      setDecimal('');
      return;
    }
    const number = [...numBin.padStart(8, '0')];

    const dec = number.reduce((total, atual, index) => {
      return total + parseInt(atual) * 2 ** (8 - index - 1);
    }, 0);

    setDecimal(dec);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Bin2Dec</Text>

      <Input value={binario} onChange={binToDec} />

      <Text style={styles.decimal}>Decimal: {decimal} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 70,
  },
  title: {
    fontSize: 32,
    color: '#888',
    textAlign: 'center',
    marginBottom: 50,
  },
  decimal: {
    margin: 10,
    fontSize: 32,
    color: '#888',
    textAlign: 'center',
  },
  input: {
    marginHorizontal: 10,
  },
});
