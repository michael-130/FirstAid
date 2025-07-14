import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import 'react-native-reanimated';

import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProvider } from '../contexts/AppContext';


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <AppProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="cart_and_order_page/order" options={{ title: "Order" }} />
            <Stack.Screen name="auth/login" options={{
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: '#5A321F',
              headerStyle: {
                backgroundColor: 'transparent',
              },
            }} />
            <Stack.Screen name="applyhome/Detail" /> {/* Just name, no component */}
          </Stack>
        </AppProvider>
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});