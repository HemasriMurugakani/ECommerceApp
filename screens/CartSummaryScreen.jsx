import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/cartsummarypage/header';
import Searchbar from '../components/cartsummarypage/searchbar';

export default function CartSummaryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [cartItems, setCartItems] = useState([]);

  // Handle Quantity Changes
  const handleQuantityChange = (index, action) => {
    const updatedCartItems = [...cartItems];
    if (action === 'increase') {
      updatedCartItems[index].quantity += 1;
    } else if (action === 'decrease' && updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
    }
    setCartItems(updatedCartItems);
  };

  // Adding item from route params
  useEffect(() => {
    if (route.params?.selectedItem) {
      setCartItems(prevItems => [...prevItems, route.params.selectedItem]);
    }
  }, [route.params?.selectedItem]);

  // Calculate total items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Header />
      <Searchbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={{ uri: 'https://img.freepik.com/free-vector/shopping-cart-realistic_1284-6011.jpg?size=626&ext=jpg&ga=GA1.1.1822889091.1716690332&semt=ais_hybrid' }}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyBoldText}>Cart is empty</Text>
            <Text style={styles.emptyScanText}>Scan barcode or add items</Text>
            <Text style={styles.emptyCatalogText}>from catalog</Text>
          </View>
        ) : (
          cartItems.map((item, index) => {
            // Calculate the total price based on quantity and add-ons
            const quantityPrice = item.quantity * item.variantPrice;
            const addOnsPrice = item.addOns.beveragesPrice + item.addOns.toppingsPrice;
            const totalPrice = quantityPrice + addOnsPrice;

            return (
              <View key={index} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemVariant}>{item.variant}</Text>

                  {/* Conditional rendering for Add-ons */}
                  {item.addOns.toppings.length > 0 && (
                    <Text style={styles.itemAddOns}>
                      Toppings: {item.addOns.toppings.join(', ')}
                    </Text>
                  )}
                  {item.addOns.beverages.length > 0 && (
                    <Text style={styles.itemAddOns}>
                      Beverages: {item.addOns.beverages.join(', ')}
                    </Text>
                  )}

                  <Text style={styles.itemTotalPrice}>
                    Total: ₹{totalPrice}
                  </Text>
                </View>

                <View style={styles.quantityContainer}>
                  {/* Minus Button */}
                  <TouchableOpacity onPress={() => handleQuantityChange(index, 'decrease')} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>

                  {/* Quantity Display */}
                  <Text style={styles.quantityText}>{item.quantity}</Text>

                  {/* Plus Button */}
                  <TouchableOpacity onPress={() => handleQuantityChange(index, 'increase')} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Conditional rendering for footer */}
      {cartItems.length > 0 && (
  <View style={styles.footer}>
    <TouchableOpacity
      style={styles.fbuttonContainer}
      onPress={() => navigation.navigate('PaymentSummary')} 
    >
      <View style={styles.ftextContainer}>
        <Text style={styles.fitemsText}>Items</Text>
        <Text style={styles.fcountText}>{totalItems}</Text>
      </View>
      <Text style={styles.fbuttonText}>View payment summary</Text>
    </TouchableOpacity>
  </View>
)}

</View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyImage: {
    width: 140,
    height: 140,
    marginBottom: 20,
    marginTop: 50,
  },
  emptyBoldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  emptyScanText: {
    fontSize: 14,
    marginBottom: 5,
  },
  emptyCatalogText: {
    fontSize: 14,
    color: 'grey',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    color: 'black',
    paddingBottom: 10,
  },
  itemVariant: {
    fontSize: 14,
    color: 'grey',
    paddingBottom: 10,
  },
  itemAddOns: {
    fontSize: 14,
    color: 'grey',
  },
  itemQuantity: {
    fontSize: 14,
    marginTop: 5,
  },
  itemTotalPrice: {
    fontSize: 14,
    marginLeft: 100,
    color:"black"
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    padding: 10,
    width: 100,
    height:40,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 25,
    color: '#000',
    marginTop:-10,
    marginLeft:-10,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginTop:-10,
    marginRight:10,
  },
  // Footer styles
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center',
    elevation: 5, // Adds elevation for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset for the shadow
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  fbuttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#1263df',
    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    elevation: 5, // Adds elevation for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset for the shadow
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  ftextContainer: {
    marginRight: 80,
  },
  fitemsText: {
    color: '#FFFFFF',
    fontSize: 14,
    // fontWeight: 'bold',
  },
  fcountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fbuttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
});
