import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import CartSummaryScreen from './screens/CartSummaryScreen';
import CatalogScreen from './screens/CatalogScreen';
import PaymentSummary from './screens/PaymentSummary';
import store from './redux/store'; // Import the Redux store



const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Global StatusBar styling for the entire app */}
        <StatusBar
          barStyle="light-content" // Light text color for status bar
          backgroundColor="#2d3e50" // Proper background color for status bar
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
    </Provider>
  );
}