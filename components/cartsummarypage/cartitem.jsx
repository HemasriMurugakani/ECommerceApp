import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg'; 
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Cartitem() {
  // const navigation = useNavigation();
  const route = useRoute(); // Get the route props

  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  // Use effect to check if there's a selected item passed from navigation
  useEffect(() => {
    if (route.params?.selectedItem) {
      setCartItems(prevItems => [...prevItems, route.params.selectedItem]);
    }
  }, [route.params?.selectedItem]);

      {/* Conditionally Render Empty Cart or Cart Items */}
      {cartItems.length === 0 ? (
        <View style={styles.emptycontainer}>
  <Image source={{ uri : 'https://img.freepik.com/free-vector/shopping-cart-realistic_1284-6011.jpg?size=626&ext=jpg&ga=GA1.1.1822889091.1716690332&semt=ais_hybrid'}} style={styles.emptyimage} />
          <Text style={styles.emptyboldText}>Cart is empty</Text>
          <Text style={styles.emptyscanText}>Scan barcode or add items</Text>
          <Text style={styles.emptycatalogText}>from catalog</Text>
        </View>
      ) : (
<View>
  {cartItems.map((item, index) => (
    <View key={index} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemVariant}>{item.variant}</Text>
        {/* Conditional rendering for Add ons */}
        {(item.addOns.toppings.length > 0 || item.addOns.beverages.length > 0) && (
          <Text style={styles.itemAddOns}>
            Add ons: {item.addOns.toppings.join(', ')}
            {item.addOns.beverages.length > 0 ? `, Beverage: ${item.addOns.beverages.join(', ')}` : ''}
          </Text>
        )}
        <Text style={styles.itemQuantity}>
          Qty: {item.quantity}
        </Text>
        <Text style={styles.itemTotalPrice}>
          {item.totalPrice} 
        </Text>
      </View>
    </View>
  ))}
</View>
      )}
  }

const styles = StyleSheet.create({
  emptycontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyimage: {
    width: 140,
    height: 140,
    marginBottom: 20,
    marginTop:50,
  },
  emptyboldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    color:'black'
  },
  emptyscanText: {
    fontSize: 14,
    marginBottom: 5,
  },
  emptycatalogText: {
    fontSize: 14,
    color: 'grey',
  },
  // passed value
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
    // fontWeight: 'bold',
    fontSize: 14,
    color:'black',
    paddingBottom:10,
  },
  itemVariant: {
    fontSize: 14,
    color: 'grey',
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
    marginTop: -32,
    marginLeft:240,
  },
});
