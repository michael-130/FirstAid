// /data/care_order/getCurrentUserId.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set } from 'firebase/database';
import { db } from '@/firebase';

const GUEST_KEY = 'guest_user_id';

export const getCurrentUserId = async (): Promise<string> => {
  // You can enhance this to use Firebase Auth later
  const storedGuestId = await AsyncStorage.getItem(GUEST_KEY);
  if (storedGuestId) {
    return storedGuestId;
  }

  // Create new guest
  const newGuestId = 'guest' + Math.floor(Math.random() * 100000);
  await AsyncStorage.setItem(GUEST_KEY, newGuestId);

  await set(ref(db, `users/${newGuestId}`), {
    createdAt: Date.now(),
    isGuest: true,
  });

  return newGuestId;
};
