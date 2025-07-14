import { FontAwesome } from '@expo/vector-icons'; // Import an icon set
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="1-home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="2-cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="3-chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="comments" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="4-news"
        options={{
          title: 'News',
          // tabBarIcon: ({ color, size }) => (
          //   <FontAwesome name="newspaper-o" color={color} size={size} />
          // ),
        }}
      />
      <Tabs.Screen
        name="5-profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}