import { CartItem } from '@/app/(tabs)/2-cart';
import Cart from '@/components/cart';
import { router, useLocalSearchParams } from 'expo-router';
import { push, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { db } from '../../firebase';
import { Link } from 'expo-router';

export default function CartScreen() {
  const { cartItems: cartItemsParam } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>(cartItemsParam ? JSON.parse(cartItemsParam as string) : []);
  const [buyer, setBuyer] = useState<string>('');

const updateQuantity = (itemId: string, change: number) => {
  setCartItems((prevItems) =>
    prevItems
      .map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      )
      .filter((item) => item.quantity > 0)
  );
};
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePay = () => {
    if (!buyer) {
      Alert.alert('Error', 'Please enter a buyer name');
      return;
    }
    const confirmPay = () => {

      saveToDatabase();
      setCartItems([]);
      Alert.alert('Success', 'Payment completed and items saved!');
    };
    Alert.alert('Confirm Payment', `Total: $${totalPrice.toFixed(2)}. Proceed?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Pay', onPress: confirmPay },
    ]);
  };

  const saveToDatabase = () => {
    const ordersRef = ref(db, 'orders/');
    cartItems.forEach((item) => {
      const newOrderRef = push(ordersRef);
      set(newOrderRef, {
        id: item.id,
        name: item.name,
        buyer: buyer,
        howMany: item.quantity,
        totalPrice: item.price * item.quantity,
        images: item.images,
      }).catch((error) => {
        console.log('Error saving order:', error.message);
      });
    });
  };

return (
    <View style={{ padding: 20,flex:1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Cart</Text>
      <Cart cartItems={cartItems} updateQuantity={updateQuantity} />
      <Text>Buyer: </Text>
      <TextInput
        style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
        value={buyer}
        onChangeText={setBuyer}
        placeholder="Enter buyer name"
      />
      <Text>Total: ${totalPrice.toFixed(2)}</Text>
      <Button title="Pay and Save" onPress={saveToDatabase}  />
      Button
      <Button
      title="Go to Order Page"
      onPress={() => router.push('/cart_and_order_page/order')}
    />
    </View>
  );
}