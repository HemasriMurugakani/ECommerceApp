import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CartSummaryScreen from './screens/CartSummaryScreen';
import CatalogScreen from './screens/CatalogScreen';
import PaymentSummary from './screens/PaymentSummary';
import { StatusBar } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
            <StatusBar
        barStyle="light-content" // For light text color on the status bar
        backgroundColor="#2d3e50e" // Same as the header color
      />

      <Stack.Navigator initialRouteName="CartSummaryScreen">
      <Stack.Screen 
  name="CartSummaryScreen" 
  component={CartSummaryScreen} 
  options={{ headerShown: false }} 
/>
        <Stack.Screen name="CatalogScreen" component={CatalogScreen}  options={{ headerShown: false }}  />
        <Stack.Screen name="PaymentSummary" component={PaymentSummary} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}