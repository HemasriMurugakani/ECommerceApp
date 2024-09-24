import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg'; 
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CartSummaryScreen() {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route props

  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  // Use effect to check if there's a selected item passed from navigation
  useEffect(() => {
    if (route.params?.selectedItem) {
      setCartItems(prevItems => [...prevItems, route.params.selectedItem]);
    }
  }, [route.params?.selectedItem]);

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        {/* SVG for Menu Icon */}
        <Svg height="30" width="30" viewBox="0 0 24 24">
          <Path fill="white" d="M3 12h18v2H3zm0 5h18v2H3zm0-10h18v2H3z" />
        </Svg>

        <Text style={styles.headerText}> Sales</Text>

        <View style={styles.notificationContainer}>
          <Svg height="30" width="30" viewBox="0 0 24 24">
            <Path
              fill="white"
              d="M12 22c1.1 0 1.99-.9 1.99-2H10c0 1.1.89 2 2 2zm6-6v-5c0-2.92-1.64-5.44-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.14 5.56 5.5 8.08 5.5 11v5l-1.5 1.5v1h16v-1l-1.5-1.5z"
            />
          </Svg>

          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>9</Text>
          </View>
        </View>

        {/* Profile Image */}
        <Image
          source={{ uri: 'data:image/png;base64,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' }}
          style={styles.profilePic}
        />
        <Image
          source={{ uri: 'https://cdn.theorg.com/3b146309-8ca6-41ac-aef5-5a395cdcdff5_thumb.jpg' }}
          style={styles.circleImage}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.searchContainer}>
            <Svg height="40" width="40" viewBox="0 0 24 24">
              <Path
                fill="grey"
                d="M15.5 14h-.79l-.28-.27C16.41 12.59 17 11.11 17 9.5 17 5.91 14.09 3 10.5 3S4 5.91 4 9.5 6.91 16 10.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10.5 14C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"
              />
            </Svg>

            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="#6E6E6E"
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('CatalogScreen')}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://images.squarespace-cdn.com/content/v1/5f92fb578b2d25334295dbd5/1620589621512-BN7LJPNHP6KRS2QVRG0V/magazine.png?format=2500w' }}
                style={styles.adjacentImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cart Summary */}
      <View style={styles.cartSummary}>
        <View style={styles.rowContainer2}>
          <View style={styles.textContainer}>
            <Text style={styles.cartTitle}>Cart summary</Text>
            <Text style={styles.orderId}>
              Order ID: <Text style={{ fontWeight: 'bold' }}>000001</Text>
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={{ uri: 'https://png.pngtree.com/png-vector/20190331/ourmid/pngtree-table-icon-with-outline-style--vector-eps10-illustration-png-image_878739.jpg' }}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M12 5v.01M12 12v.01M12 19v.01" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profilePic: {
    marginRight:12,
    width: 100,
    height: 50,
    borderRadius: 10,
    objectFit: 'fill',
  
  },
  circleImage: {
    width: 40, // Adjust the size
    height: 40,
    borderRadius: 75, // Half of width/height to make it a circle
    borderWidth: 2,
    borderColor: '#2d3e50', // Optional: for adding a border around the image
    marginLeft:-34,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3e50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,  
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left', 
  },
  notificationContainer: {
    position: 'relative',
    marginRight: 20, 
  },
  notificationBadge: {
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  notificationCount: {
    color: 'white',
    fontSize: 11,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#D3D3D3',  
    shadowColor: '#000',    
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, 
    marginTop:20,
    marginLeft:20,
    marginRight:15,
    width:300,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  rowContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,  
    height: 60,
    // margin: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    backgroundColor:'white',
    borderColor:'#d9dbdd',
    borderWidth:2,
  },
  adjacentImage: {
    width: 50,
    height: 50,
    tintColor: '#1976D2',  
  },
  cartsummary: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  rowcontainer: {
    flexDirection: 'row',  // Align text and icons in a row
    justifyContent: 'space-between',  // Space between text and icons
    alignItems: 'center',  // Vertically align items
  },
  textContainer: {
    flex: 1,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft:10,
  },
  orderId: {
    fontSize: 14,
    marginTop:10,
    marginLeft:10,
    marginBottom:-15,
    color:'black'
  },
  iconContainer: {
    // // alignItems: 'center',
    // gap: 10, 
    flexDirection: 'row',
    color : 'white',
    // backgroundColor:'white' 
    
  },
  iconButton: {
    width: 55,  // Set fixed width and height for rounded containers
    height: 55,
    borderRadius: 12,  // Rounded corners
    justifyContent: 'center',  // Center icon inside
    alignItems: 'center', 
    backgroundColor: 'white',  // Light background color for icon container
    marginLeft: 10,  // Spacing between the icons
    color : 'white',
    marginRight:10,
    borderWidth:2,
    borderColor:'#d9dbdd'
    
  },
  rowContainer2: {
    flexDirection: 'row',  // Align items horizontally
    justifyContent: 'flex-start',  // Start items from the left
    alignItems: 'center',  // Align vertically in the middle
    paddingVertical: 10,
    
  },
  iconTextContainer: {
    flexDirection: 'row',  // Align icon and text in a row
    // alignItems: 'center',  // Vertically center the icon and text
    marginRight: 10,  // Space between sections
    // paddingHorizontal: -20,
    marginBottom:10,
    marginLeft:20,
  },
  text: {
    marginLeft: 5,  // Space between icon and text
    fontSize: 14,
    color: 'black',
  },
  divider: {
    marginHorizontal: 2,  // Space around the divider
    color: 'grey',
    fontSize: 18,
    marginBottom:10,
    marginRight:-12,
  },
  tableHeader: {
    paddingTop:10,
    paddingLeft:20,
    paddingRight:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff', // Ensure background color is set
    elevation: 4, // For Android
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  headerText2: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#666',
  },
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
