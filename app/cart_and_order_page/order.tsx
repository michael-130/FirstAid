import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { db } from '../../firebase';

// 定义订单类型
type Order = {
  id: string;
  name: string;
  buyer: string;
  howMany: number;
  totalPrice: number;
};

// 定义组件
export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取订单数据
  useEffect(() => {
    const ordersRef = ref(db, 'orders/');
    const unsubscribe = onValue(
      ordersRef,
      (snapshot) => {
        try {
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
          setError(null);
        } catch (err) {
          console.error('获取订单失败:', err);
          setError('无法加载订单，请稍后重试');
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        console.error('Firebase 错误:', err);
        setError('无法连接到数据库，请检查网络');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 渲染单个订单项
  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderName}>{item.name}</Text>
      <Text style={styles.orderDetails}>购买者: {item.buyer}</Text>
      <Text style={styles.orderDetails}>数量: {item.howMany}</Text>
      <Text style={styles.orderDetails}>总价: ${item.totalPrice.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 标题 */}
      <Text style={styles.title}>我的订单</Text>

      {/* 加载状态 */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007aff" />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : orders.length === 0 ? (
        <Text style={styles.emptyText}>暂无订单，快去购物吧！</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#ff4d4f',
    textAlign: 'center',
    marginVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  orderDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
});