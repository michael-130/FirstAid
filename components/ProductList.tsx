import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type Props = {
  addToCart: (item: Product) => void;
  onProductPress: (item: Product) => void;
};

export default function ProductList({ addToCart, onProductPress }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log('📦 Starting Firebase fetch...');
  const productsRef = ref(db, 'products/');

  const unsubscribe = onValue(
    productsRef,
    (snapshot) => {
      const data = snapshot.val();
      console.log('📥 Data from Firebase:', data);

      if (data) {
        const productArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log('🆕 setProducts - Parsed products:', productArray);
        setProducts(productArray);
      } else {
        console.log('🚫 No data found. Setting products to empty');
        setProducts([]);
      }

      console.log('⏳ setLoading(false)');
      setLoading(false);
    },
    (error) => {
      console.error('❌ Firebase error:', error.message);
      setProducts([]);
      setLoading(false);
    }
  );

  return () => {
    console.log('🧹 Cleaning up Firebase listener');
    unsubscribe();
  };
}, []);

  if (loading) {
    return <Text>⏳ Loading products...</Text>;
  }

  const renderItem = ({ item }: { item: Product }) => {
    console.log('🛍️ Rendering item:', item);

    return (
      <View
        style={{
          flex: 1,
          margin: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 10,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log('🖱️ Product pressed:', item);
            onProductPress(item);
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            onError={(error) =>
              console.warn('🚫 Image load error for', item.name, ':', error.nativeEvent.error)
            }
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 16, marginVertical: 5 }}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: 'green' }}>${item.price.toFixed(2)}</Text>

        <Button
          title="+ Add"
          color="#28a745"
          onPress={() => {
            console.log('🛒 Add to cart pressed:', item);
            addToCart(item);
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {products.length === 0 ? (
        <Text>❗ No products available</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ padding: 10 }}
          initialNumToRender={9}
          maxToRenderPerBatch={15}
          windowSize={5}
          showsVerticalScrollIndicator={true}
        />
      )}
    </View>
  );
}
