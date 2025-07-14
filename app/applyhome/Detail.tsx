import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/data/care_order/types_home';
import { ref, set } from 'firebase/database';
import { db } from '@/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { migrateGuestDataToUser } from '@/data/care_order/migrateguestdata';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { getCurrentUserId } from '@/data/care_order/getcurrentid'; // import helper
type DetailRouteProp = RouteProp<RootStackParamList, 'applyhome/Detail'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation();
  const { catKey, illnessName, data } = route.params;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
const handleLoginAndMigrate = async () => {
const auth = getAuth();
const user = auth.currentUser;
  if (!user) {
    alert('🔐 Please log in first.');
    
    return;
  }

  await migrateGuestDataToUser(user.uid);
  alert(`✅ Migrated guest data to ${user.uid}`);
};
  // 👇 Load local guest or logged-in userId
useEffect(() => {
  const getUser = async () => {
    const id = await getCurrentUserId();
    setUserId(id);
  };
  getUser();
}, []);

  const onDismissDatePicker = () => setDatePickerVisible(false);

  const onConfirmDate = (params: { date?: Date }) => {
    if (params.date) {
      setSelectedDate(params.date);
      setDatePickerVisible(false);
      setTimePickerVisible(true);
    } else {
      setDatePickerVisible(false);
    }
  };

  const onDismissTimePicker = () => setTimePickerVisible(false);

  const onConfirmTime = (params: { hours: number; minutes: number }) => {
    if (selectedDate) {
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(params.hours);
      updatedDate.setMinutes(params.minutes);
      setSelectedDate(updatedDate);
    }
    setTimePickerVisible(false);
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      alert('Please pick a date and time.');
      return;
    }

    if (!userId) {
      alert('User ID not found. Please try again.');
      return;
    }

    const appointmentRef = ref(
      db,
      `users/${userId}/appointment/${catKey}/${illnessName}`
    );

    await set(appointmentRef, {
      appointment: true,
      time: selectedDate.toISOString(),
    });

    navigation.goBack();
  };

const handleAnonymousLogin = async () => {
  try {
    const auth = getAuth();
    const userCredential = await signInAnonymously(auth);
    console.log('✅ Anonymous user signed in:', userCredential.user.uid);
    alert(`Logged in as anonymous user: ${userCredential.user.uid}`);
  } catch (error) {
    console.error('❌ Anonymous login failed:', error);
  }
};
return (
  <View style={styles.container}>
    <Text style={styles.title}>{illnessName}</Text>
    <Text>{data.address}</Text>
    <Text>{data.description}</Text>

    <Button title="Pick Appointment Date" onPress={() => setDatePickerVisible(true)} />

    {selectedDate && (
      <Text style={styles.selected}>Selected: {selectedDate.toLocaleString()}</Text>
    )}

    <Button title="Confirm Appointment" onPress={handleSubmit} />

    {/* 🧪 Test migration manually */}
    <Button title="Login and Migrate Guest Data" onPress={handleLoginAndMigrate} />
<Button title="Login Anonymously" onPress={handleAnonymousLogin} />
<Button
  title="Migrate Guest Data"
  onPress={async () => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) {
      Alert.alert('Error', 'Please log in first.');
      console.log('🚫 Migration failed: No logged-in user');
      return;
    }

    try {
      console.log('🔄 Attempting migration for user:', currentUser.uid);
      await migrateGuestDataToUser(currentUser.uid);
      Alert.alert('Success', 'Guest data migrated to your user account!');
      console.log('🎉 Migration successful');
    } catch (error) {
      Alert.alert('Error', `Failed to migrate guest data: ${error.message}`);
      console.error('❌ Migration error:', error);
    }
  }}
/>

    <DatePickerModal
      mode="single"
      visible={datePickerVisible}
      onDismiss={onDismissDatePicker}
      date={selectedDate ?? new Date()}
      onConfirm={onConfirmDate}
      locale="en"
    />

    <TimePickerModal
      visible={timePickerVisible}
      onDismiss={onDismissTimePicker}
      onConfirm={onConfirmTime}
      hours={selectedDate?.getHours() ?? 0}
      minutes={selectedDate?.getMinutes() ?? 0}
    />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  selected: {
    fontSize: 16,
    color: 'green',
    marginVertical: 12,
  },
});
