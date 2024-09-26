import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

export default function Searchbar() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* Search Bar and Image */}
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

        {/* Clickable Image */}
        <TouchableOpacity onPress={() => navigation.navigate('CatalogScreen')}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.squarespace-cdn.com/content/v1/5f92fb578b2d25334295dbd5/1620589621512-BN7LJPNHP6KRS2QVRG0V/magazine.png?format=2500w' }}
              style={styles.adjacentImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Cart Summary */}
      <View style={styles.cartsummary}>
        <View style={styles.rowContainer2}>
          {/* Text Container */}
          <View style={styles.textContainer}>
            <Text style={styles.cartTitle}>Cart summary</Text>
            <Text style={styles.orderId}>
              Order ID: <Text style={{ fontWeight: 'bold' }}>000001</Text>
            </Text>
          </View>

          {/* Icons as Buttons */}
          <View style={styles.iconContainer}>
            {/* Table Icon */}
            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={{ uri: 'https://png.pngtree.com/png-vector/20190331/ourmid/pngtree-table-icon-with-outline-style--vector-eps10-illustration-png-image_878739.jpg' }}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>

            {/* Three Dots Icon */}
            <TouchableOpacity style={styles.iconButton}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M12 5v.01M12 12v.01M12 19v.01" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Table Information */}
      <View style={styles.rowContainer}>
        {/* Table Section */}
        <View style={styles.iconTextContainer}>
          <Image
            source={{ uri: 'https://png.pngtree.com/png-vector/20190331/ourmid/pngtree-table-icon-with-outline-style--vector-eps10-illustration-png-image_878739.jpg' }}
            style={{ width: 24, height: 25 }}
          />
          <Text style={styles.text}>Table 1</Text>
        </View>

        {/* Divider */}
        <Text style={styles.divider}>•</Text>

        {/* Person 1 Section */}
        <View style={styles.iconTextContainer}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 5a4 4 0 1 1 0 8 4 4 0 1 1 0-8zM6.5 20a7.5 7.5 0 0 1 13 0" />
          </Svg>
          <Text style={styles.text}>Sam richard</Text>
        </View>

        {/* Divider */}
        <Text style={styles.divider}>•</Text>

        {/* Person 2 Section */}
        <View style={styles.iconTextContainer}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 5a4 4 0 1 1 0 8 4 4 0 1 1 0-8zM6.5 20a7.5 7.5 0 0 1 13 0" />
          </Svg>
          <Text style={styles.text}>Mark</Text>
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText2}>Item</Text>
        <Text style={styles.headerText2}>Qty & Amount (SAR)</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
    color: '#666',
  },
});