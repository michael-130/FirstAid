// CategoryCard.tsx
import { SicknessInfo } from './types_home';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

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

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{illnessName}</Text>
        {expanded && (
          <>
            <Text>{data.description}</Text>
            <Text>{data.address}</Text>
            <Text>{data.time}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 17,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: 'red',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default CategoryCard;
