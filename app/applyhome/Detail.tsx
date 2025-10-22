import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView, Animated } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/data/care_order/types_home';
import { ref, set } from 'firebase/database';
import { db } from '@/firebase';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { getCurrentUserId } from '@/data/care_order/getcurrentid';
import LottieView from 'lottie-react-native';

type DetailRouteProp = RouteProp<RootStackParamList, 'applyhome/Detail'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation();
  const { catKey, illnessName, data } = route.params;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Animations
  const [cardAnim] = useState(new Animated.Value(0));
  const [successAnim] = useState(new Animated.Value(0));
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const id = await getCurrentUserId();
      setUserId(id);
    };
    getUser();

    // Animate card on mount
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const showSuccessBanner = () => {
    setShowLottie(true);
    Animated.timing(successAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(successAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
          setShowLottie(false);
        });
      }, 2000);
    });
  };

  const onDismissDatePicker = () => setDatePickerVisible(false);
  const onConfirmDate = ({ date }: { date?: Date }) => {
    if (date) {
      setSelectedDate(date);
      setDatePickerVisible(false);
      setTimePickerVisible(true);
    } else setDatePickerVisible(false);
  };
  const onDismissTimePicker = () => setTimePickerVisible(false);
  const onConfirmTime = ({ hours, minutes }: { hours: number; minutes: number }) => {
    if (selectedDate) {
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours);
      updatedDate.setMinutes(minutes);
      setSelectedDate(updatedDate);
    }
    setTimePickerVisible(false);
  };

  const handleSubmit = async () => {
    if (!selectedDate) return Alert.alert('Pick a date and time.');
    if (!userId) return Alert.alert('User ID not found.');

    const appointmentRef = ref(db, `users/${userId}/appointment/${catKey}/${illnessName}`);
    await set(appointmentRef, { appointment: true, time: selectedDate.toISOString() });

    showSuccessBanner();
    setTimeout(() => navigation.goBack(), 2200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>{illnessName}</Text>

      {/* Animated Card */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardAnim,
            transform: [
              {
                translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.cardTitle}>Address</Text>
        <Text style={styles.cardText}>{data.address}</Text>
        <Text style={styles.cardTitle}>Description</Text>
        <Text style={styles.cardText}>{data.description}</Text>
      </Animated.View>

      {/* Animated Button */}
      <Pressable
        style={({ pressed }) => [styles.button, { transform: [{ scale: pressed ? 0.95 : 1 }] }]}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.buttonText}>Pick Appointment Date</Text>
      </Pressable>

      {/* Selected Date/Time Animated */}
      {selectedDate && (
        <Animated.View
          style={{
            marginVertical: 12,
            opacity: successAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1] }),
            transform: [
              { translateY: successAnim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) },
            ],
          }}
        >
          <Text style={styles.selected}>Selected: {selectedDate.toLocaleString()}</Text>
        </Animated.View>
      )}

      <Pressable
        style={({ pressed }) => [styles.submitButton, { transform: [{ scale: pressed ? 0.95 : 1 }] }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Confirm Appointment</Text>
      </Pressable>

      {/* Success Banner */}
      <Animated.View
        style={[
          styles.successBanner,
          { opacity: successAnim, transform: [{ translateY: successAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] },
        ]}
      >
        <Text style={styles.successText}>✅ Appointment Set!</Text>
      </Animated.View>

      {/* Lottie Animation */}
      {showLottie && (
        <LottieView
          source={require('@/assets/Lottie Lego.json')}
          autoPlay
          loop={false}
          style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 20 }}
        />
      )}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardTitle: { fontWeight: '600', marginTop: 10, fontSize: 16 },
  cardText: { fontSize: 14, color: '#555', marginTop: 4 },
  button: { backgroundColor: '#6C63FF', borderRadius: 12, padding: 15, alignItems: 'center', marginBottom: 15 },
  submitButton: { backgroundColor: '#34C759', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  selected: { fontSize: 16, color: 'green' },
  successBanner: { position: 'absolute', top: 50, left: 20, right: 20, backgroundColor: '#34C759', padding: 15, borderRadius: 12, alignItems: 'center' },
  successText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
