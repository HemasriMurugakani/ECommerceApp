import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Svg, { Path } from 'react-native-svg';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


// BackArrowIcon component
const BackArrowIcon = ({ width = 25, height = 24, color = "#1976D2" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill={color} />
  </Svg>
);

const BottomSheet = ({ isVisible, item, onClose, onAddToOrder }) => {
  const [showAddOns, setShowAddOns] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState({
    toppings: [],
    beverages: [],
  });
  const [toggleState, setToggleState] = useState('variants');
  const [quantity, setQuantity] = useState(1); // State for quantity

  const toggleAddOn = (category, addOn) => {
    const currentSelection = selectedAddOns[category];
    if (currentSelection.includes(addOn)) {
      setSelectedAddOns({
        ...selectedAddOns,
        [category]: currentSelection.filter((addon) => addon !== addOn),
      });
    } else {
      setSelectedAddOns({
        ...selectedAddOns,
        [category]: [...currentSelection, addOn],
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = () => {
    const basePrice = selectedVariant ? selectedVariant.price : item.discountedPrice;
    const addOnsPrice = Object.values(selectedAddOns).flat().reduce((sum, addon) => sum + addon.price, 0);
    return basePrice * quantity + addOnsPrice; 
  };
  const navigation = useNavigation();
 
    
    const handleAddToOrder = () => {
      const selectedItem = {
          name: item.name,
          image: item.image,
          quantity: quantity,
          variant: selectedVariant ? selectedVariant.name : null,
          addOns: {
              toppings: selectedAddOns.toppings.map(t => t.name),
              beverages: selectedAddOns.beverages.map(b => b.name),
          },
          totalPrice: totalPrice().toFixed(2),
      };
      
      console.log(selectedItem);
  
      // Navigate to CartSummaryScreen and pass the selected item
      navigation.navigate('CartSummaryScreen', { selectedItem });
      
      onClose();
  };

  return (
    <Modal isVisible={isVisible} style={styles.modal} onBackdropPress={onClose}>
      {item && (
        <View style={styles.bottomSheet}>
          <ScrollView>
            {!showAddOns ? (
              <>
                <Image source={{ uri: item.image }} style={styles.modalImage} />
                <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                  <Text style={styles.closeText}>×</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>{item.name}</Text>
                <View style={styles.sizePriceContainer}>
                  <Text style={styles.sizeText}>{item.size.join(', ')}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>SAR {item.originalPrice}</Text>
                    <Text style={styles.discountedPrice}>SAR {item.discountedPrice}</Text>
                  </View>
                </View>

                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Calorie per 100g</Text>
                    <Text style={styles.infoValue}>{item.calorie}</Text>
                  </View>
                  <View style={[styles.infoColumn, styles.foodTypeColumn]}>
                    <Text style={styles.infoLabel}>Food type</Text>
                    <Text style={styles.infoValue}>{item.foodType}</Text>
                  </View>
                </View>

                <View style={styles.divider} />
                <TouchableOpacity style={styles.addItemButton} onPress={() => setShowAddOns(true)}>
                  <Text style={styles.addItemButtonText}>Add item</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.backButtonContainer}>
                  <TouchableOpacity onPress={() => setShowAddOns(false)}>
                    <BackArrowIcon width={24} height={24} />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Variants and Add-ons</Text>
                </View>

                <View style={styles.itemInfoContainer}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>

                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[styles.toggleButton, toggleState === 'variants' && styles.activeToggle]}
                    onPress={() => setToggleState('variants')}
                  >
                    <Text style={[styles.toggleText, toggleState === 'variants' && styles.activeToggleText]}>Variants </Text>
                  </TouchableOpacity>
                  <View style={styles.centerLine} />
                  <TouchableOpacity
                    style={[styles.toggleButton, toggleState === 'addons' && styles.activeToggle]}
                    onPress={() => setToggleState('addons')}
                  >
                    <Text style={[styles.toggleText, toggleState === 'addons' && styles.activeToggleText]}>Add-ons</Text>
                  </TouchableOpacity>
                </View>

                {toggleState === 'variants' && item.variants && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Variants</Text>
                    <RadioButton.Group
                      onValueChange={(value) => setSelectedVariant(item.variants.find(v => v.name === value))}
                      value={selectedVariant ? selectedVariant.name : null}
                    >
                      {item.variants.map((variant, index) => (
                        <View key={index} style={styles.variantOption}>
                          <View style={styles.variantLabel}>
                            <RadioButton
                              value={variant.name}
                              color="#1976D2"
                              uncheckedColor="#999"
                            />
                            <Text style={styles.variantText}>{variant.name}</Text>
                          </View>
                          <Text style={[styles.variantPrice, selectedVariant === variant && styles.selectedPrice]}>
                            SAR {variant.price}
                          </Text>
                        </View>
                      ))}
                    </RadioButton.Group>
                  </View>
                )}

                {toggleState === 'addons' && item.addOns && (
                  <ScrollView style={styles.addOnsContainer}>
                    {/* Add-ons Sections (Toppings and Beverages) */}
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Toppings</Text>
                      {item.addOns.toppings.map((topping, index) => (
                        <View key={index} style={styles.addOnOption}>
                          <TouchableOpacity style={styles.checkbox} onPress={() => toggleAddOn('toppings', topping)}>
                            <View style={[styles.checkBackground, selectedAddOns.toppings.some(t => t.name === topping.name) && styles.checkedBackground]}>
                              {selectedAddOns.toppings.some(t => t.name === topping.name) && (
                                <Svg width="24" height="24" viewBox="0 0 24 24">
                                  <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white" />
                                </Svg>
                              )}
                            </View>
                          </TouchableOpacity>
                          <Text style={styles.addOnText}>{topping.name}</Text>
                          <Text style={[styles.addOnPrice, selectedAddOns.toppings.some(t => t.name === topping.name) && styles.selectedAddOnPrice]}>
                            SAR {topping.price}
                          </Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Beverages</Text>
                      {item.addOns.beverages.map((beverage, index) => (
                        <View key={index} style={styles.addOnOption}>
                          <TouchableOpacity style={styles.checkbox} onPress={() => toggleAddOn('beverages', beverage)}>
                            <View style={[styles.checkBackground, selectedAddOns.beverages.some(b => b.name === beverage.name) && styles.checkedBackground]}>
                              {selectedAddOns.beverages.some(b => b.name === beverage.name) && (
                                <Svg width="24" height="24" viewBox="0 0 24 24">
                                  <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white" />
                                </Svg>
                              )}
                            </View>
                          </TouchableOpacity>
                          <Text style={styles.addOnText}>{beverage.name}</Text>
                          <Text style={[styles.addOnPrice, selectedAddOns.beverages.some(b => b.name === beverage.name) && styles.selectedAddOnPrice]}>
                            SAR {beverage.price}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                )}
               

                {/* Quantity Controls and Add to Order Button */}
                <View style={styles.container}>
  
  {/* Total Price Container (Aligned to Right) */}
  <View style={styles.totalContainer}>
  <Text style={styles.itemTotalText}>Item Total</Text>
  <Text style={styles.totalText}>SAR {totalPrice()}</Text>
</View>
  
  {/* Footer with Quantity Controls and Add to Order Button */}
  <View style={styles.footer}>
    <View style={styles.quantityContainer}>
      <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
        <Text style={styles.quantityText}>-</Text>
      </TouchableOpacity>

      <View style={styles.quantityCountContainer}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>

      <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
        <Text style={styles.quantityText}>+</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.addToOrderButton} onPress={handleAddToOrder}>
          <Text style={styles.addToOrderButtonText}>Add to Order</Text>
        </TouchableOpacity>
  </View>
</View>
              </>
            )}
          </ScrollView>
        </View>
      )}
    </Modal>
  );
};



const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalImage: {
    width: '100%',
    height: 275,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    backgroundColor: '#f3f1f2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f2f1f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeText: {
    fontSize: 30,
    color: '#000',
    top: -9,
  },
  selectedPrice: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 20,
  },
  sizePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  sizeText: {
    fontSize: 12,
    color: '#555',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#888',
    marginRight: 10,
    marginTop:-4,
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginTop:-4,
  },
  description: {
    // marginTop: -5,
    fontSize: 15,
    color: 'black',
    // paddingHorizontal: 20,
    marginLeft:20,

  },
  description2: {
    marginTop: -25,
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 20,
    marginLeft:10,

  },
  divider: {
    borderBottomWidth: 0.8,
    borderColor: '#d9dbdd',
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  variantOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  variantLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOnOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  variantText: {
    fontSize: 14,
    color: '#333',
  },
  addOnText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  variantPrice: {
    fontSize: 14,
    color: 'black',
    fontWeight:"bold",
  },
  addOnPrice: {
    fontSize: 16,
    color: 'black',
    fontWeight:"bold",
  },
  selectedAddOnPrice: {
    color: '#1976D2', // Change to your desired color
    fontWeight: 'bold', // Optional: to make it stand out
  },
  totalContainer: {
  flexDirection: 'row',       // Aligns children horizontally
    // Places "Item Total" and total value at opposite ends
  paddingHorizontal: 20,
  marginTop: 20,
  alignItems: 'center',      // Vertically centers the text
},
  itemTotalText: {
  fontSize: 14,
  fontWeight: 'bold',
  color: 'black',
  marginTop:-20,
},
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:-8,
    color: 'black',
    marginLeft:202,
  },
 addItemButton: {
    backgroundColor: '#1976D2', // Customize as needed
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal:35,
    alignItems: 'center',
    marginTop: 10,
    marginLeft:18,
    width:370,
  },
  addItemButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Styles for Confirm and Add to Cart button
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white",
    paddingTop:-30,
    borderWidth:1,
    borderRadius:10,
    borderColor: '#ddd',
    width:130, // Centers the buttons and the count
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  quantityButton: {
  width: 40, // enough space for + and - symbols
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop:-30,
},
  quantityText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    color:"black",
  },
  quantityCountContainer: {
    marginHorizontal: 10, // Space between the count and buttons
    alignItems: 'center', // Ensures the count is centered
  },
  quantity: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000', // Adjust color if needed
  },
  addToOrderButton: {
    backgroundColor: '#1976D2', // Customize as needed
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 5,
    width:190,
    marginLeft:15,
  },
  addToOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  foodTypeColumn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 85,
    marginLeft:10,
    borderRadius: 5,
    marginRight: -10,
    marginTop:-10,
    marginBottom:10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius:10,
  },
  activeToggle: {
    backgroundColor: '#1976D2',
    borderRadius:-10,
  },
  toggleText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  activeToggleText: {
    fontWeight: 'bold',
    color: 'white',
  },
  centerLine: {
    width: 1,
    backgroundColor: '#ddd',
  },
  addOnsContainer: {
    maxHeight: 200, // Adjust this value as needed
  },
  checkbox: {
    width: 35,
    height: 35,
    padding: 5,
  },
  checkBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 4,
  },
  checkedBackground: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
});

export default BottomSheet;