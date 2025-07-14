// AppointmentCard.tsx
import { SicknessInfo } from './types_home';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type AppointmentCardProps = {
  illnessName: string;
  data: SicknessInfo;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ illnessName, data }) => (
  <View style={styles.card}>
    <View style={styles.content}>
      <Text style={styles.title}>{illnessName}</Text>
      <Text style={styles.subtitle}>🕒 {data.time}</Text>
      <Text style={styles.subtitle}>📍 {data.address}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create<{
  card: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
}>({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 17,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
});

export default AppointmentCard;
