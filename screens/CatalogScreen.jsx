import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import BottomSheet from '../components/bottomsheet';
import { useNavigation } from '@react-navigation/native';
import jsondata from './data.json';

const CatalogScreen = () => {
  const navigation = useNavigation();
  const [items] = useState(jsondata.items);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToOrder = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };
  const handleShowCartSummary = () => {
    navigation.navigate('CartSummaryScreen', { cartItems });
  };


  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter(item => item.category === activeFilter);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, item.outOfStock && styles.outOfStock]}
      disabled={item.outOfStock}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onError={(error) => console.log(`Image load error: ${error.nativeEvent.error}`)}
        />
        <TouchableOpacity style={styles.infoIcon}>
          <Svg width="20" height="20" viewBox="0 0 24 24">
            <Path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14H11v-2h2v2zm0-4H11V7h2v5z" fill="white" />
          </Svg>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{item.name}</Text>
      {item.novariants && <Text style={styles.novariants}>{item.novariants} variants</Text>}
      {item.outOfStock && <Text style={styles.outOfStockText}>Unavailable</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Catalog</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity>
            <Svg width="25" height="25" viewBox="0 0 24 24">
              <Path d="M12 5C13.1046 5 14 4.10457 14 3C14 1.89543 13.1046 1 12 1C10.8954 1 10 1.89543 10 3C10 4.10457 10.8954 5 12 5Z" fill="black" />
              <Path d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z" fill="black" />
              <Path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="black" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path d="M6 6l12 12M6 18L18 6" stroke="black" strokeWidth={2} strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabs}>
            {['All', 'Favourite', 'Burger', 'Sandwich', 'Juice', 'Pizza'].map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tab, activeFilter === filter && styles.activeTab]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={activeFilter === filter ? styles.activeTabText : styles.tabText}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />

     <BottomSheet
        isVisible={isModalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
        onAddToOrder={handleAddToOrder} // Pass the function here
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path d="M20 8h-2V3H6v5H4c-1.1 0-2 .9-2 2v7h4v4h12v-4h4v-7c0-1.1-.9-2-2-2zm-4 10H8v-4h8v4zm2-8H6V5h12v5z" fill="#007bff" />
          </Svg>
          <Text style={styles.footerButtonText}>Print bill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButtonProceed} onPress={handleShowCartSummary}>
          <Text style={styles.footerButtonTextProceed}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
     backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'white',
    },
    titleContainer: {
      marginRight: 20, // Space between the title and the right edge
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 10,
      marginBottom: 10,
      paddingHorizontal:10,
    },
    iconGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 70,
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start', // Align tabs to the start
      paddingHorizontal: 2,
      backgroundColor:'white',
      marginBottom: 15,
      height:62,
      
    },
    tabContent: {
      flexDirection: 'row',  // Aligns the image and text horizontally
      alignItems: 'center',  // Vertically centers the image and text
    },
    tabIcon: {
      width: 20,  // Adjust width based on your design
      height: 20, // Adjust height as needed
      marginRight: 8,  // Adds space between the icon and the text
      marginLeft:-5,
    },
    
    
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      
      paddingHorizontal:10,
     
    },
    tab: {
      paddingVertical: 14,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      margin:4,
      borderWidth: 1,
      borderColor:'#D7D9E4'
      ,
      
    },
    activeTab: {
      backgroundColor: '#007bff',
      borderColor:'#007bff',
    },
    tabText: {
      fontSize: 14,
      color: 'black',
      fontWeight:'500',
    },
    activeTabText: {
      color: 'white',
      fontWeight: '500',
    },

    container2: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    progressContainer: {
      marginTop:8,
      width: 100,
      height: 10, 
      backgroundColor: '#E0E0E0', 
      borderRadius: 5, 
      overflow: 'hidden', 
      marginBottom:20,
    },
    progressFill: {
      width: '20%', 
      height: '100%',
      backgroundColor: '#003049', 
    },
    item: {
      flex: 1,
      margin: 4,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      height: 220,  
      width: '30%',  
      elevation: 3, 
      marginBottom:20,
    },
    imageContainer: {
      width: '100%',
      height: '50%', 
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      resizeMode: 'cover',
    },
    infoIcon: {
      position: 'absolute',
      top: 4,
      right: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 50,
      padding: 5,
      
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noStockText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    name: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 10,
      marginHorizontal:10,
      color: 'black',
    },
    novariants: {
      fontSize: 12,
      color: '#777',
      marginHorizontal:10,
    },
    outOfStock: {
      opacity: 0.5,
  
    },
    outOfStockText: {
      fontSize: 12,
      color: 'black',
      marginTop: 5,
      marginHorizontal:10,
    },
    row: {
      flex: 1,
      justifyContent: 'space-between',
    },
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      elevation:2,
    },
    footerButton: {
      flexDirection: 'row',
      alignItems: 'center',  
      justifyContent: 'center', 
      width: 130,
      borderWidth: 1,
      borderColor: '#007bff',
      borderRadius:10,
      paddingHorizontal:18,
  },
  footerButtonText: {
      marginLeft: 10,
      fontSize: 14,
      color: '#007bff',
      fontWeight:'bold',
      marginRight:10,
      
  },
    footerButtonProceed: {
      backgroundColor: '#007bff',
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 30,
    },
    footerButtonTextProceed: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
export default CatalogScreen;