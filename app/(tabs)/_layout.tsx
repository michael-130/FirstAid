import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E7D5A',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingTop: 8,
          paddingBottom: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="1-home"
        options={{
          title: '首页',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="2-cart"
        options={{
          title: '购物车',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="3-chat"
        options={{
          title: '咨询',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="4-news"
        options={{
          title: '资讯',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="article" color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="5-profile"
        options={{
          title: '我的',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size + 2} />
          ),
        }}
      />
    </Tabs>
  );
}