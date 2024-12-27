import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PaperProvider, Text, TextInput, Button, Divider } from 'react-native-paper';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConversion = async () => {
    try {
      if (!amount || isNaN(amount)) {
        console.error('Please enter a valid number for amount');
        return;  // Prevent conversion if amount is invalid
      }
  
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      
      if (!response.data.rates[toCurrency]) {
        console.error('Invalid target currency');
        return;  // Handle case where the target currency is invalid
      }
  
      const rate = response.data.rates[toCurrency];
      const result = (parseFloat(amount) * rate).toFixed(2);  // Parse amount to float for multiplication
      setConvertedAmount(result);
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
          />
          <TextInput
            label="From Currency"
            value={fromCurrency}
            onChangeText={setFromCurrency}

          />
          <TextInput
            label="To Currency"
            value={toCurrency}
            onChangeText={setToCurrency}

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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

