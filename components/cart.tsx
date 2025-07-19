import React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
};

type Props = {
  cartItems: CartItem[];
  updateQuantity: (itemId: string, change: number) => void;
};

export default function Cart({ cartItems, updateQuantity }: Props) {
  console.log('🧾 Rendering <Cart> component');
  console.log('📦 Current cartItems:', cartItems);

  return (
    <ScrollView style={{ maxHeight: '70%' }} showsVerticalScrollIndicator={true}>
      <View>
        <Text style={{ fontWeight: 'bold' }}>🛒 Cart:</Text>

        {cartItems.length === 0 ? (
          <Text>🕳️ Cart is empty</Text>
        ) : (
          cartItems.map((item) => {
            console.log('🛍️ Rendering cart item:', item);

            return (
              <View
                key={item.id}
                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
              >
                <Image
                  source={{ uri: item.images }}
                  style={{ width: 70, height: 100, resizeMode: 'contain' }}
                  onError={(error) =>
                    console.warn(
                      `🚨 Image load error for "${item.name}":`,
                      error.nativeEvent.error
                    )
                  }
                />
                <Text style={{ flex: 1, marginHorizontal: 10 }}>
                  {item.name} x{item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </Text>

                <Button
                  title="-1"
                  onPress={() => {
                    console.log(`➖ Button pressed: Decrease "${item.name}" (id=${item.id})`);
                    updateQuantity(item.id, -1);
                  }}
                />

                <Button
                  title="+1"
                  onPress={() => {
                    console.log(`➕ Button pressed: Increase "${item.name}" (id=${item.id})`);
                    updateQuantity(item.id, 1);
                  }}
                />
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
