import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
  Button, 
  Image, 
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  StatusBar,
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import ProductList, { Product } from '../../components/ProductList';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
};

export default function CartScreen() {
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
      const newCartItem: CartItem = { 
        id: uniqueId, 
        productId: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1, 
        images: product.image || '' 
      };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const goToCart = () => {
    router.push({ 
      pathname: '../../cart_and_order_page/cart', 
      params: { cartItems: JSON.stringify(cartItems) } 
    });
    setModalVisible(false);
  };

  const buyNow = () => {
    console.log('Buy Now pressed for', selectedProduct?.name);
    setModalVisible(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D5A" />
      
      {/* Header */}
      <LinearGradient
        colors={['#2E7D5A', '#4A9B6E']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>护理用品商城</Text>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => router.push({ 
              pathname: '../../cart_and_order_page/cart', 
              params: { cartItems: JSON.stringify(cartItems) } 
            })}
          >
            <MaterialIcons name="shopping-cart" size={24} color="#FFFFFF" />
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.container}>
        <ProductList addToCart={addToCart} onProductPress={handleProductPress} />
      </View>

      {/* Product Detail Modal */}
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
                <View style={styles.modalHeader}>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <Image
                  source={{ uri: selectedProduct.image }}
                  style={styles.modalImage}
                  onError={(error) => console.log('Image error for', selectedProduct.name, ':', error.nativeEvent.error)}
                />
                
                <View style={styles.modalInfo}>
                  <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                  <Text style={styles.modalPrice}>¥{selectedProduct.price.toFixed(2)}</Text>
                  <Text style={styles.modalDescription}>
                    专业护理用品，确保您的健康和舒适。本产品经过严格质量检测，符合医疗标准。
                  </Text>
                  
                  <View style={styles.modalActions}>
                    <TouchableOpacity style={styles.addToCartBtn} onPress={() => {
                      addToCart(selectedProduct);
                      setModalVisible(false);
                    }}>
                      <MaterialIcons name="add-shopping-cart" size={20} color="#FFFFFF" />
                      <Text style={styles.addToCartText}>加入购物车</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.buyNowBtn} onPress={buyNow}>
                      <MaterialIcons name="flash-on" size={20} color="#FFFFFF" />
                      <Text style={styles.buyNowText}>立即购买</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cartButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '75%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: { 
    width: '100%', 
    height: 200, 
    resizeMode: 'contain', 
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
  },
  modalInfo: {
    paddingHorizontal: 20,
    flex: 1,
  },
  modalTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: '#333333',
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D5A',
    marginBottom: 16,
  },
  modalDescription: { 
    fontSize: 16, 
    color: '#666666',
    lineHeight: 24,
    marginBottom: 32,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  addToCartBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2E7D5A',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buyNowBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});