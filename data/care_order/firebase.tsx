import { ref, get, set } from 'firebase/database';
import { db } from '@/firebase';
import { CategoryMap, User } from './types_home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GUEST_KEY = 'guest_user_id';

export const fetchCareOrderData = async (
  userIdFromLogin?: string
): Promise<{
  categories: CategoryMap;
  userData: User | null;
  userId: string;
}> => {
  try {
    // Step 1: Categories
    const catRef = ref(db, 'categories');
    const catSnap = await get(catRef);
    let categories: CategoryMap = {};
    if (catSnap.exists()) {
      const catVal = catSnap.val();
      if (catVal && typeof catVal === 'object') {
        categories = catVal as CategoryMap;
      }
    }

    // Step 2: Determine userId
    let userId = userIdFromLogin ?? null;

    // Step 3: If no logged-in user, check for stored guest ID
    if (!userId) {
      const storedGuestId = await AsyncStorage.getItem(GUEST_KEY);
      if (storedGuestId) {
        userId = storedGuestId;
      } else {
        // Generate new guest ID
        userId = 'guest' + Math.floor(Math.random() * 100000);
        await AsyncStorage.setItem(GUEST_KEY, userId);

        // Create new guest user in Firebase
        await set(ref(db, `users/${userId}`), {
          createdAt: Date.now(),
          isGuest: true,
        });
      }
    }

    // Step 4: Fetch user data
    const userRef = ref(db, `users/${userId}`);
    const userSnap = await get(userRef);

    let userData: User | null = null;
    if (userSnap.exists()) {
      const userVal = userSnap.val();
      if (userVal && typeof userVal === 'object') {
        userData = userVal as User;
      }
    }

    return {
      categories,
      userData,
      userId,
    };
  } catch (error) {
    console.error('❌ Error fetching Firebase data:', error);
    throw error;
  }
};
