// /data/care_order/firebaseData.ts
import { ref, get } from 'firebase/database';
import { db } from '@/firebase';
import { CategoryMap, User } from './types_home';

/**
 * Fetches categories and user data from Firebase Realtime Database.
 * @returns An object with categories and userData.
 */
export const fetchCareOrderData = async (): Promise<{
  categories: CategoryMap;
  userData: User | null;
}> => {
  try {
    const catRef = ref(db, 'categories');
    const userRef = ref(db, 'users/UserA');

    const [catSnap, userSnap] = await Promise.all([get(catRef), get(userRef)]);

    const result: {
      categories: CategoryMap;
      userData: User | null;
    } = {
      categories: {},
      userData: null, // ✅ Initialize correctly
    };

    if (catSnap.exists()) {
      const catVal = catSnap.val();
      if (catVal && typeof catVal === 'object' && !Array.isArray(catVal)) {
        result.categories = catVal as CategoryMap;
      }
    }

    if (userSnap.exists()) {
      const userVal = userSnap.val();
      if (userVal && typeof userVal === 'object' && !Array.isArray(userVal)) {
        result.userData = userVal as User;
      }
    }

    return result;
  } catch (error) {
    console.error('❌ Error fetching Firebase data:', error);
    throw error;
  }
};
