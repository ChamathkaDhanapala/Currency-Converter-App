
import { StyleSheet,  View, ScrollView } from 'react-native';
import { PaperProvider,Text, Divider, TextInput} from 'react-native-paper';

const MyComponent = () => {
  const [text, setText] = React.useState("");
};

export default function App() {
  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <Text variant="headlineLarge">Currency Converter</Text>
          <Divider/>
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

