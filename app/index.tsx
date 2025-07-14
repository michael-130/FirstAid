import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Navigate to the tabs layout route (this works if (tabs)/index.tsx exists)
    router.replace('/(tabs)/1-home');
  }, []);

  return null;
}
