import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from './types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Index() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    navigation.navigate('(tabs)'); // no more TS error
  }, []);

  return null;
}
