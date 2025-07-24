import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AppointmentCard from '../../data/care_order/AppointmentCard';
import CategoryCard from '../../data/care_order/CategoryCard';
import CategoryFilter from '../../data/care_order/categoryfilter';
import SicknessInfo, { CategoryMap, User } from '@/data/care_order/types_home';
import { fetchCareOrderData } from '@/data/care_order/firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/data/care_order/types_home';
import { RefreshControl } from 'react-native';
import { getAuth, onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [categories, setCategories] = useState<CategoryMap>({});
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [authUser, setAuthUser] = useState<{ uid: string; isAnonymous: boolean } | null>(null);
  const auth = getAuth();

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D5A" />
        <Text style={styles.loadingText}>正在加载护理服务...</Text>
      </View>
    );
  }

  const handleLoginGuest = async () => {
    try {
      await signInAnonymously(auth);
      Alert.alert('登录成功', '已以访客身份登录');
    } catch (e) {
      Alert.alert('登录失败', '访客登录失败，请重试');
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('退出成功', '已成功退出登录');
    } catch (e) {
      Alert.alert('退出失败', '退出登录失败，请重试');
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
      <StatusBar barStyle="light-content" backgroundColor="#2E7D5A" />
      
      {/* Header with gradient */}
      <LinearGradient
        colors={['#2E7D5A', '#4A9B6E']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>您好！</Text>
              <Text style={styles.welcomeText}>欢迎使用护理助手</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialIcons name="notifications" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Auth Status */}
          <View style={styles.authStatus}>
            {authUser ? (
              <View style={styles.authContainer}>
                <MaterialIcons name="account-circle" size={20} color="#db2626ff" />
                <Text style={styles.authText}>
                  {authUser.isAnonymous ? '访客用户' : '已登录用户'}
                </Text>
                <TouchableOpacity onPress={handleLogout} style={styles.authButton}>
                  <Text style={styles.authButtonText}>退出</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.authContainer}>
                <MaterialIcons name="account-circle" size={20} color="#ff0000ff" />
                <Text style={styles.authText}>未登录</Text>
                <TouchableOpacity onPress={handleLoginGuest} style={styles.authButton}>
                  <Text style={styles.authButtonText}>访客登录</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.container} 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#2E7D5A']}
            tintColor="#2E7D5A"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <MaterialIcons name="emergency" size={24} color="#FF6B6B" />
            </View>
            <Text style={styles.quickActionText}>紧急护理</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <MaterialIcons name="schedule" size={24} color="#4ECDC4" />
            </View>
            <Text style={styles.quickActionText}>预约服务</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <MaterialIcons name="local-hospital" size={24} color="#45B7D1" />
            </View>
            <Text style={styles.quickActionText}>健康咨询</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <MaterialIcons name="medication" size={24} color="#F7B731" />
            </View>
            <Text style={styles.quickActionText}>用药提醒</Text>
          </TouchableOpacity>
        </View>

        {/* Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="event" size={24} color="#2E7D5A" />
            <Text style={styles.sectionTitle}>我的预约</Text>
          </View>
          {Object.entries(userAppointments).length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="event-available" size={48} color="#C7C7CC" />
              <Text style={styles.emptyStateText}>暂无预约</Text>
              <Text style={styles.emptyStateSubtext}>点击下方服务卡片预约护理服务</Text>
            </View>
          ) : (
            Object.entries(userAppointments).map(([catKey, illnessMap]) => 
              Object.entries(illnessMap).map(([illnessName, info]) => {
                const illnessData = categories[catKey]?.[illnessName];
                if (info.appointment && illnessData) {
                  console.log(`Rendering appointment card for ${illnessName} under category ${catKey}`);
                  return (
                    <AppointmentCard
                      key={`appointment-${illnessName}`}
                      illnessName={illnessName}
                      data={illnessData}
                    />
                  );
                }
                return null;
              })
            )
          )}
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="category" size={24} color="#2E7D5A" />
            <Text style={styles.sectionTitle}>护理分类</Text>
          </View>
          <CategoryFilter 
            selected={selectedCategory} 
            onSelect={(cat) => {
              console.log('Category selected:', cat);
              setSelectedCategory(cat);
            }} 
          />
        </View>

        {/* Recommended Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="recommend" size={24} color="#2E7D5A" />
            <Text style={styles.sectionTitle}>推荐服务</Text>
          </View>
          {Object.entries(categories)
            .filter(([catKey]) => selectedCategory === '全部' || selectedCategory === catKey)
            .flatMap(([catKey, illnesses]) => 
              Object.entries(illnesses).map(([illnessName, data]) => (
                <TouchableOpacity key={`${catKey}-${illnessName}`}>
                  <CategoryCard
                    illnessName={illnessName}
                    data={data}
                    onPress={() => {
                      console.log('Pressed CategoryCard: navigating & setting category');
                      setSelectedCategory(catKey);
                      navigation.navigate('applyhome/Detail', { catKey, illnessName, data });
                    }}
                  />
                </TouchableOpacity>
              ))
            )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#2E7D5A',
    fontWeight: '500',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    
    
  },
  headerContent: {
    flex: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authStatus: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
  },
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
  authButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D5A',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#C7C7CC',
    textAlign: 'center',
    marginTop: 4,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;