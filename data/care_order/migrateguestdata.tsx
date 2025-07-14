import { db } from '@/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, ref, remove, set } from 'firebase/database';

const GUEST_KEY = 'guest_user_id';

export const migrateGuestDataToUser = async (authUid: string) => {
  console.log('🚀 Starting migration for user:', authUid);
  
  const guestId = await AsyncStorage.getItem(GUEST_KEY);
  if (!guestId) {
    console.log('🚫 No guest ID found to migrate.');
    throw new Error('No guest ID found');
  }
  console.log('🔍 Found guest ID:', guestId);

  const guestRef = ref(db, `users/${guestId}`);
  const userRef = ref(db, `users/${authUid}`);

  const guestSnap = await get(guestRef);
  if (!guestSnap.exists()) {
    console.log('🚫 Guest data not found in Firebase.');
    throw new Error('No guest data in Firebase');
  }
  console.log('📦 Guest data found:', guestSnap.val());

  // Copy data
  await set(userRef, {
    ...guestSnap.val(),
    isGuest: false,
    migratedFrom: guestId,
  });
  console.log('✅ Guest data copied to user:', authUid);

  // Remove guest data
  await remove(guestRef);
  console.log('🗑️ Guest data removed from Firebase:', guestId);

  // Remove guest ID locally
  await AsyncStorage.removeItem(GUEST_KEY);
  console.log('🧹 Guest ID removed from AsyncStorage');

  return true;
};
