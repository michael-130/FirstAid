import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../utils/constants';
import { Article } from '../utils/types';
import { Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';

interface NewsCardProps {
  article: Article;
  horizontal?: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8;

const NewsCard: React.FC<NewsCardProps> = ({ article, horizontal = false }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/news/${article.id}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        horizontal ? styles.horizontalCard : styles.verticalCard
      ]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: article.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{article.category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.excerpt} numberOfLines={2}>
          {article.excerpt}
        </Text>
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Clock size={14} color={COLORS.gray} />
            <Text style={styles.date}>
              {format(new Date(article.publishedAt), 'MMM d, yyyy')}
            </Text>
          </View>
          <Text style={styles.readTime}>{article.readTime} min read</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  verticalCard: {
    width: '100%',
  },
  horizontalCard: {
    width: cardWidth,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  category: {
    fontFamily: FONTS.interMedium,
    fontSize: 14,
    color: COLORS.primary,
  },
  title: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 18,
    marginBottom: 8,
    color: COLORS.darkText,
    lineHeight: 24,
  },
  excerpt: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 6,
  },
  readTime: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default NewsCard;