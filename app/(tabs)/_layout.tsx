import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="1-home"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="2-cart"
        options={{ title: 'Cart' }}
      />
      <Tabs.Screen
        name="3-chat"
        options={{ title: 'Chat' }}
      />
      <Tabs.Screen
        name="4-news"
        options={{ title: 'News' }}
      />
      <Tabs.Screen
        name="5-profile"
        options={{ title: 'Profile' }}
      />
    </Tabs>
  );
}
