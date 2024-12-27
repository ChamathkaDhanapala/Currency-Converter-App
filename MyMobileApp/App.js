import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PaperProvider, Text, TextInput, Button, Divider } from 'react-native-paper';
import axios from 'axios';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConversion = async () => {
    try {
      if (!amount || isNaN(amount)) {
        console.error('Please enter a valid number for amount');
        return;  
      }
  
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      console.log(response.data); 
      
      if (!response.data.rates[toCurrency]) {
        console.error('Invalid target currency');
        return;  
      }
  
      const rate = response.data.rates[toCurrency];
      const result = (parseFloat(amount) * rate).toFixed(2);  
      setConvertedAmount(result);
      console.log(`Converted amount: ${result}`);  
    } catch (error) {
      console.error('Error fetching conversion data:', error);
    }
  };
  

  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <Text variant="headlineLarge">Currency Converter</Text>
          <Divider />
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="From Currency"
            value={fromCurrency}
            onChangeText={setFromCurrency}
            style={styles.input}
          />
          <TextInput
            label="To Currency"
            value={toCurrency}
            onChangeText={setToCurrency}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleConversion} style={styles.button}>
            Convert
          </Button>
          {convertedAmount && (
            <Text variant="bodyMedium" style={styles.result}>
              Converted Amount: {convertedAmount} {toCurrency}
            </Text>
          )}

        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#f0f8ff', 
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1E90FF', 
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  divider: {
    marginVertical: 10,
    backgroundColor: '#1E90FF', 
  },
  text: {
  },
});


