import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const categories = [
  { key: 'A', label: '全部' },
  { key: 'B', label: '老年护理' },
  { key: 'C', label: '康复护理' },
  { key: 'D', label: '慢病管理' },
  { key: 'E', label: '术后护理' }
];

interface Props {
  selected: string; // 'A', 'B', etc.
  onSelect: (key: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.key}
          style={[styles.button, selected === cat.key && styles.selected]}
          onPress={() => onSelect(cat.key)}
        >
          <Text
            style={[
              styles.buttonText,
              selected === cat.key && styles.selectedText,
            ]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selected: {
    backgroundColor: '#2E7D5A',
    borderColor: '#2E7D5A',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CategoryFilter;