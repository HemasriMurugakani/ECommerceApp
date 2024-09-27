import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';
import { useRoute } from '@react-navigation/native'; // Use route to get params

const PaymentSummary = () => {
  const route = useRoute();
  const { subtotalPrice } = route.params; // Retrieve subtotalPrice from route params

  // Define constants
  const discountRate = 0.05; // 5% discount
  const taxRate = 0.05; // 5% tax rate

  // Calculate discounts, taxable amount, total tax, and grand total
  const discount = subtotalPrice * discountRate;
  const taxableAmount = subtotalPrice - discount;
  const totalTax = taxableAmount * taxRate;
  const grandTotal = taxableAmount + totalTax;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment Summary</Text>
      </View>

      {/* Order Details */}
      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Order ID :</Text>
          <Text style={styles.value2}>12345689</Text>
          {/* <Icon name="calendar-today" size={20} color="#000" /> */}
          <Text style={styles.label}>Ashwin</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sub total</Text>
          <Text style={styles.value}>₹{subtotalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Discounts</Text>
          {/* <Svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M3 6h18M8 6V4a2 2 0 0 1 4 0v2M10 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm12 0v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V6h8z" />
          </Svg> */}
          <Text style={[styles.value, styles.discount]}>- ₹{discount.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Taxable amount</Text>
          <Text style={styles.value}>₹{taxableAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total tax</Text>
          <Text style={styles.value}>₹{totalTax.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Grand total</Text>
          <Text style={styles.grandTotal}>₹{grandTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add notes</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.whiteButton} onPress={() => {}}>
            <Text style={styles.blackText}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButton} onPress={() => {}}>
            <Text style={styles.blackText}>Coupon</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButton} onPress={() => {}}>
            <Text style={styles.blackText}>Discount</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actions2}>
          <TouchableOpacity style={styles.whiteButton2} onPress={() => {}}>
            <Text style={styles.blackText2}>Print Bill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButton3} onPress={() => {}}>
            <Text style={styles.blackText3}>Proceed Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2d3e50',
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
      },
      arrow: {
        fontSize: 24, // Size of the arrow
        color: 'grey', // Color of the arrow
        marginRight: 10, // Space between arrow and text
      },
      headerText: {
        flex: 1,  
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left', 
      },
  summary: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
  
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  value2: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: -60,
    marginRight:10,
  },
  discount: {
    color: 'green',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 200,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 5, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color:'black',
    fontWeight:'bold',
  },
  actions: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Space between buttons
    alignItems: 'center',
    padding: 8,
    marginLeft:10,
  },
  whiteButton: {
    backgroundColor: '#fff', // White background for buttons
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5, // Spacing between buttons
    borderWidth: 2,
    borderColor: 'black', // Optional border styling
  },
  blackText: {
    color: '#000', // Black text color
    fontSize: 14,
  },
  actions2: {
    flexDirection: 'row', // Arrange buttons in a row
    alignItems: 'center',
    padding: 10,
    marginLeft:10,
  },
  whiteButton2: {
    backgroundColor: '#fff', // White background for buttons
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 5, // Spacing between buttons
    borderWidth: 1.5,
    borderColor: '#007bff', // Optional border styling
  },
  whiteButton3: {
    marginLeft:8,
    backgroundColor: '#007bff', // White background for buttons
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginHorizontal: 5, // Spacing between buttons
    borderWidth: 2,
    borderColor: '#007bff', // Optional border styling
  },
  blackText2: {
    color: '#007bff', 
    fontSize: 14,
  },
  blackText3: {
    color: 'white', 
    fontSize: 14,
  },
});

export default PaymentSummary;
