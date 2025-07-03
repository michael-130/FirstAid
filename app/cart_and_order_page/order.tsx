import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { db } from '../../firebase';

type Order = {
  id: string;
  name: string;
  buyer: string;
  howMany: number;
  totalPrice: number;
};

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const ordersRef = ref(db, 'orders/');
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const orderArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOrders(orderArray);
      } else {
        setOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5 }}>
            <Text>{item.name} - Buyer: {item.buyer} - Quantity: {item.howMany}</Text>
          </View>
        )}
      />
    </View>
  );
}