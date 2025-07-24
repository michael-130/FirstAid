import { CartItem } from '@/app/(tabs)/2-cart';
import Cart from '@/components/cart';
import { router, useLocalSearchParams } from 'expo-router';
import { push, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../../firebase';

// 定义组件
export default function CartScreen() {
  // 获取路由参数并解析购物车数据
  const { cartItems: cartItemsParam } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>(
    cartItemsParam ? JSON.parse(cartItemsParam as string) : []
  );
  const [buyer, setBuyer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 更新商品数量
  const updateQuantity = (itemId: string, change: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 计算总价
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 保存订单到数据库
  const saveToDatabase = async () => {
    try {
      setIsLoading(true);
      const ordersRef = ref(db, 'orders');
      for (const item of cartItems) {
        const newOrderRef = push(ordersRef);
        await set(newOrderRef, {
          id: item.id,
          name: item.name,
          buyer,
          howMany: item.quantity,
          totalPrice: item.price * item.quantity,
          images: item.images,
        });
      }
      return true;
    } catch (error) {
      console.error('保存订单失败:', error);
      Alert.alert('错误', '保存订单失败，请稍后重试');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 处理支付逻辑
  const handlePay = () => {
    if (!buyer.trim()) {
      Alert.alert('提示', '请输入购买者姓名');
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert('提示', '购物车为空，请添加商品');
      return;
    }
    if (buyer.length > 50) {
      Alert.alert('提示', '购买者姓名过长，请控制在50字以内');
      return;
    }

    Alert.alert('确认支付', `总金额: $${totalPrice.toFixed(2)}，确认支付？`, [
      { text: '取消', style: 'cancel' },
      {
        text: '确认',
        onPress: async () => {
          const saved = await saveToDatabase();
          if (saved) {
            setCartItems([]);
            setBuyer('');
            Alert.alert('成功', '支付完成，订单已保存！', [
              { text: '好的', onPress: () => router.push('/cart_and_order_page/order') },
            ]);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 标题 */}
      <Text style={styles.title}>我的购物车</Text>

      {/* 购物车内容 */}
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>购物车为空，快去添加商品吧！</Text>
      ) : (
        <Cart cartItems={cartItems} updateQuantity={updateQuantity} />
      )}

      {/* 购买者姓名输入 */}
      <Text style={styles.label}>购买者姓名</Text>
      <TextInput
        style={[styles.input, !buyer.trim() && styles.inputError]}
        value={buyer}
        onChangeText={setBuyer}
        placeholder="请输入姓名"
        placeholderTextColor="#999"
        maxLength={50}
      />

      {/* 总金额 */}
      <Text style={styles.total}>
        总金额: <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
      </Text>

      {/* 支付按钮 */}
      <TouchableOpacity
        style={[styles.payButton, isLoading && styles.disabledButton]}
        onPress={handlePay}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>支付并保存</Text>
        )}
      </TouchableOpacity>

      {/* 查看订单按钮 */}
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => router.push('/cart_and_order_page/order')}
      >
        <Text style={styles.orderButtonText}>查看订单</Text>
      </TouchableOpacity>
    </View>
  );
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  inputError: {
    borderColor: '#ff4d4f',
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  totalAmount: {
    color: '#ff4d4f',
    fontWeight: '700',
  },
  payButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  orderButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007aff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 5,
  },
  orderButtonText: {
    color: '#007aff',
    fontSize: 18,
    fontWeight: '600',
  },
});