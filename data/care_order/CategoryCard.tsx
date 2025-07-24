import { SicknessInfo } from './types_home';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type CategoryCardProps = {
  illnessName: string;
  data: SicknessInfo;
  onPress?: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ illnessName, data, onPress }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
    if (onPress) onPress();
  };

  const getServiceIcon = (illnessName: string) => {
    if (illnessName.includes('老年') || illnessName.includes('阿尔茨海默')) return 'elderly';
    if (illnessName.includes('康复')) return 'healing';
    if (illnessName.includes('术后')) return 'medical-services';
    if (illnessName.includes('慢病')) return 'monitor-heart';
    return 'local-hospital';
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons 
            name={getServiceIcon(illnessName) as any} 
            size={24} 
            color="#2E7D5A" 
          />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{illnessName}</Text>
          <Text style={styles.subtitle}>专业护理服务</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>起</Text>
          <Text style={styles.price}>¥199</Text>
        </View>
      </View>

      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.divider} />
          
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <MaterialIcons name="description" size={16} color="#666" />
              <Text style={styles.detailLabel}>服务描述：</Text>
            </View>
            <Text style={styles.detailText}>{data.description}</Text>
          </View>

          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <MaterialIcons name="location-on" size={16} color="#666" />
              <Text style={styles.detailLabel}>服务地址：</Text>
            </View>
            <Text style={styles.detailText}>{data.address}</Text>
          </View>

          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <MaterialIcons name="schedule" size={16} color="#666" />
              <Text style={styles.detailLabel}>服务时间：</Text>
            </View>
            <Text style={styles.detailText}>{data.time}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.consultButton}>
              <MaterialIcons name="chat" size={18} color="#2E7D5A" />
              <Text style={styles.consultText}>在线咨询</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookButton}>
              <MaterialIcons name="event" size={18} color="#FFFFFF" />
              <Text style={styles.bookText}>立即预约</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.cardFooter}>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>4.8</Text>
          <Text style={styles.reviewCount}>(128条评价)</Text>
        </View>
        <MaterialIcons 
          name={expanded ? "expand-less" : "expand-more"} 
          size={24} 
          color="#C7C7CC" 
        />
      </View>
    </TouchableOpacity>
  );
};

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
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 10,
    color: '#999999',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D5A',
  },
  expandedContent: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    paddingLeft: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  consultButton: {
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
  consultText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D5A',
    marginLeft: 6,
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2E7D5A',
  },
  bookText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
});

export default CategoryCard;