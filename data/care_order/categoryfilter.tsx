import React from 'react'
import { View , Text,TouchableOpacity,StyleSheet} from 'react-native'

type Props ={
    selected : string ;
    onSelect:(Key:string)=>void;
}


const categories = ['All', 'A', 'B', 'C'];

const CategoryFilter: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.button, selected === cat && styles.selected]}
          onPress={() => onSelect(cat)}
        >
          <Text style={{ color: selected === cat ? 'white' : 'black' }}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 10,
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  selected: {
    backgroundColor: '#2196F3',
  },
});

export default CategoryFilter;