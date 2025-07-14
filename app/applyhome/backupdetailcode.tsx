import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/data/care_order/types_home';
import { ref, set } from 'firebase/database';
import { db } from '@/firebase';

// import from react-native-paper-dates
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

type DetailRouteProp = RouteProp<RootStackParamList, 'applyhome/Detail'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation();

  const { catKey, illnessName, data } = route.params;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  // Open time picker after date is selected
  const onDismissDatePicker = () => setDatePickerVisible(false);

  const onConfirmDate = (params: { date?: Date }) => {
    if (params.date) {
      setSelectedDate(params.date);
      setDatePickerVisible(false);
      setTimePickerVisible(true); // show time picker next
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

    const userId = 'UserA'; // Replace with Firebase Auth UID

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

      {/* Date picker modal */}
      <DatePickerModal
        mode="single"
        visible={datePickerVisible}
        onDismiss={onDismissDatePicker}
        date={selectedDate ?? new Date()}
        onConfirm={onConfirmDate}
        locale='en'
      />

      {/* Time picker modal */}
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
