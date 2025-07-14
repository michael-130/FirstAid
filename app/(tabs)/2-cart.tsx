import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native';
import ProductList, { Product } from '../../components/ProductList';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
};

export default function HomeScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addToCart = (product: Product) => {
    const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const existingItem = cartItems.find(item => item.productId === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      const newCartItem: CartItem = { id: uniqueId, productId: product.id, name: product.name, price: product.price, quantity: 1, images: product.image || '' };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const goToCart = () => {
    router.push({ pathname: '../../cart_and_order_page/cart', params: { cartItems: JSON.stringify(cartItems) } });
    setModalVisible(false);
  };

  const buyNow = () => {
    // Add buy logic here (e.g., navigate to payment screen)
    console.log('Buy Now pressed for', selectedProduct?.name);
    setModalVisible(false);
  };

  return (
    <>
    <Stack.Screen
        options={{
          headerTitle: 'Product List',
        }}
      />
    <View style={styles.container}>
      {/* <Text style={styles.title}>Product List</Text> */}
      <ProductList addToCart={addToCart} onProductPress={handleProductPress} />
      <Button title="Go to Cart" onPress={() => router.push({ pathname: '../../cart_and_order_page/cart', params: { cartItems: JSON.stringify(cartItems) } })} />
 
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image
                  source={{ uri: selectedProduct.image }}
                  style={styles.modalImage}
                  onError={(error) => console.log('Image error for', selectedProduct.name, ':', error.nativeEvent.error)}
                />
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalDescription}>
                  Description: This is a sample description for {selectedProduct.name}. It provides details about the product.
                </Text>
                <View style={styles.buttonContainer}>
                  <Button title="Go to Cart" onPress={goToCart} />
                  <Button title="Buy Now" onPress={buyNow} color="#28a745" />
                </View>
              </>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '66%', // Approximately 2/3 of the screen
    alignItems: 'center',
  },
  modalImage: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalDescription: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
});