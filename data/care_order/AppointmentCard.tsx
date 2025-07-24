import { SicknessInfo } from './types_home';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type AppointmentCardProps = {
  illnessName: string;
  data: SicknessInfo;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ illnessName, data }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.statusIndicator}>
        <MaterialIcons name="check-circle" size={16} color="#4CD964" />
        <Text style={styles.statusText}>已预约</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <MaterialIcons name="more-horiz" size={20} color="#C7C7CC" />
      </TouchableOpacity>
    </View>
    
    <View style={styles.content}>
      <Text style={styles.title}>{illnessName}</Text>
      
      <View style={styles.infoRow}>
        <MaterialIcons name="access-time" size={16} color="#2E7D5A" />
        <Text style={styles.infoText}>{data.time}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <MaterialIcons name="location-on" size={16} color="#2E7D5A" />
        <Text style={styles.infoText}>{data.address}</Text>
      </View>
    </View>
    
    <View style={styles.actions}>
      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="phone" size={18} color="#2E7D5A" />
        <Text style={styles.actionText}>联系护理师</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryButton}>
        <MaterialIcons name="directions" size={18} color="#FFFFFF" />
        <Text style={styles.primaryButtonText}>查看详情</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D5A',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CD964',
    marginLeft: 4,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E7D5A',
    backgroundColor: '#FFFFFF',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D5A',
    marginLeft: 6,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2E7D5A',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
});

export default AppointmentCard;