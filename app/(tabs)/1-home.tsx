// HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppointmentCard from '../../data/care_order/AppointmentCard';
import CategoryCard from '../../data/care_order/CategoryCard';

import { fetchCareOrderData } from '@/data/care_order/firebase';
import SicknessInfo, { CategoryMap, RootStackParamList, User } from '@/data/care_order/types_home';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';
import { getAuth, onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';
import { RefreshControl } from 'react-native';
import CategoryFilter from '../../data/care_order/categoryfilter';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [categories, setCategories] = useState<CategoryMap>({});
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp>();
const onRefresh = async () => {
  console.log('🔄 User triggered refresh...');
  setRefreshing(true);
  try {
    const { categories, userData } = await fetchCareOrderData();
    setCategories(categories);
    setUserData(userData);
    console.log('✅ Data refreshed');
  } catch (e) {
    console.error('🔥 Error refreshing data:', e);
  } finally {
    setRefreshing(false);
  }
};
  useEffect(() => {
    const loadData = async () => {
      console.log('🔄 Starting to load care order data...');
      try {
        const { categories, userData } = await fetchCareOrderData();
        console.log('✅ Data loaded:', { categories, userData });
        setCategories(categories);
        setUserData(userData);
      } catch (e) {
        console.error('🔥 Error loading care data:', e);
      } finally {
        setLoading(false);
        console.log('⏳ Loading finished');
      }
    };

    loadData();
  }, []);
  const [authUser, setAuthUser] = useState<{ uid: string; isAnonymous: boolean } | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({ uid: user.uid, isAnonymous: user.isAnonymous });
      } else {
        setAuthUser(null);
      }
    });
    return unsubscribe;
  }, []);
  if (loading) {
    console.log('⏳ Still loading, showing spinner');
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const handleLoginGuest = async () => {
    try {
      await signInAnonymously(auth);
      Alert.alert('Logged in as guest');
    } catch (e) {
      Alert.alert('Failed to login as guest');
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logged out');
    } catch (e) {
      Alert.alert('Failed to logout');
      console.error(e);
    }
  };

  const userAppointments = userData?.appointment || {};
  console.log('👤 User appointments:', userAppointments);
  console.log('📋 Categories:', categories);
  console.log('🎯 Selected Category:', selectedCategory);

  const handlePressRecommended = (illnessName: string, data: SicknessInfo) => {
    console.log('Pressed Recommended:', illnessName, data);
  };

  return (
 <>
 <Stack.Screen
        options={{
          headerTitle: '🏠 Home',
        }}
      />
 <View style={styles.statusBar}>
      {authUser ? (
        <>
          <Text style={styles.statusText}>
            {authUser.isAnonymous
              ? `Logged in as Guest (${authUser.uid})`
              : `Logged in as User (${authUser.uid})`}
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.actionText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.statusText}>Not logged in</Text>
          <TouchableOpacity onPress={handleLoginGuest}>
            <Text style={styles.actionText}>Login as Guest</Text>
          </TouchableOpacity>
        </>
      )}
    </View><ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* <Text style={styles.header}>🏠 Home</Text> */}

        {/* Appointments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Appointments</Text>
          {Object.entries(userAppointments).map(([catKey, illnessMap]) => Object.entries(illnessMap).map(([illnessName, info]) => {
            const illnessData = categories[catKey]?.[illnessName];
            if (info.appointment && illnessData) {
              console.log(`Rendering appointment card for ${illnessName} under category ${catKey}`);
              return (
                <AppointmentCard
                  key={`appointment-${illnessName}`}
                  illnessName={illnessName}
                  data={illnessData} />
              );
            }
            return null;
          })
          )}
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🦴 Category Filter</Text>
          <CategoryFilter selected={selectedCategory} onSelect={(cat) => {
            console.log('Category selected:', cat);
            setSelectedCategory(cat);
          } } />
        </View>

        {/* Recommended */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Recommended</Text>
          {Object.entries(categories)
            .filter(([catKey]) => selectedCategory === 'All' || selectedCategory === catKey)
            .flatMap(([catKey, illnesses]) => Object.entries(illnesses).map(([illnessName, data]) => (
              <TouchableOpacity
              >
                <CategoryCard
                  key={`${catKey}-${illnessName}`}
                  illnessName={illnessName}
                  data={data}
                  onPress={() => {
                    console.log('Pressed CategoryCard: navigating & setting category');
                    setSelectedCategory(catKey);
                    navigation.navigate('applyhome/Detail', { catKey, illnessName, data });

                  } } />
              </TouchableOpacity>
            ))
            )}
        </View>
      </ScrollView></>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    margin: 16,
    color: '#333',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 12,
    color: '#1E90FF',
  },
  statusBar: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },



});



export default HomeScreen;
