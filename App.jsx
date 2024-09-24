import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CartSummaryScreen from './screens/CartSummaryScreen';
import CatalogScreen from './screens/CatalogScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CartSummaryScreen">
      <Stack.Screen 
  name="CartSummaryScreen" 
  component={CartSummaryScreen} 
  options={{ headerShown: false }} 
/>
        <Stack.Screen name="CatalogScreen" component={CatalogScreen}  options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}