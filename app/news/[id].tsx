import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Share2, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { COLORS, FONTS } from '@/utils/constants';
import { articles } from '@/utils/data';
import { format } from 'date-fns';

export default function ArticleDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Article not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title}\n\nRead more at Wellness App`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  // Convert content to paragraphs
  const paragraphs = article.content.split('\n\n');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={COLORS.darkText} />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{article.category}</Text>
        </View>

        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.authorContainer}>
          <Image 
            source={{ uri: article.author.avatarUrl }} 
            style={styles.authorImage}
          />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{article.author.name}</Text>
            <Text style={styles.publishDate}>
              {format(new Date(article.publishedAt), 'MMMM d, yyyy')} · {article.readTime} min read
            </Text>
          </View>
        </View>

        <Image 
          source={{ uri: article.imageUrl }} 
          style={styles.coverImage}
          resizeMode="cover"
        />

        <View style={styles.actionBar}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleLike}
          >
            <Heart 
              size={24} 
              color={isLiked ? COLORS.error : COLORS.darkText} 
              fill={isLiked ? COLORS.error : 'none'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Share2 size={24} color={COLORS.darkText} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleBookmark}
          >
            {isBookmarked ? (
              <BookmarkCheck size={24} color={COLORS.primary} fill={COLORS.primary} />
            ) : (
              <Bookmark size={24} color={COLORS.darkText} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        <View style={styles.tagsContainer}>
          {article.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.relatedArticlesSection}>
          <Text style={styles.relatedArticlesTitle}>Related Articles</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedArticlesContainer}
          >
            {articles
              .filter(a => a.id !== article.id && a.category === article.category)
              .slice(0, 3)
              .map((relatedArticle) => (
                <TouchableOpacity
                  key={relatedArticle.id}
                  style={styles.relatedArticleCard}
                  onPress={() => {
                    router.push(`/news/${relatedArticle.id}`);
                  }}
                >
                  <Image 
                    source={{ uri: relatedArticle.imageUrl }} 
                    style={styles.relatedArticleImage}
                    resizeMode="cover"
                  />
                  <View style={styles.relatedArticleContent}>
                    <Text style={styles.relatedArticleTitle} numberOfLines={2}>
                      {relatedArticle.title}
                    </Text>
                    <Text style={styles.relatedArticleDate}>
                      {format(new Date(relatedArticle.publishedAt), 'MMM d, yyyy')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 8 : 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 18,
    color: COLORS.darkText,
    marginBottom: 16,
  },
  backButtonText: {
    fontFamily: FONTS.interMedium,
    fontSize: 16,
    color: COLORS.primary,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  category: {
    fontFamily: FONTS.interSemiBold,
    fontSize: 16,
    color: COLORS.primary,
  },
  title: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 28,
    color: COLORS.darkText,
    paddingHorizontal: 16,
    marginBottom: 16,
    lineHeight: 38,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
    color: COLORS.darkText,
  },
  publishDate: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: COLORS.gray,
  },
  coverImage: {
    width: '100%',
    height: 250,
    marginBottom: 16,
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  actionButton: {
    marginRight: 24,
  },
  content: {
    paddingHorizontal: 16,
  },
  paragraph: {
    fontFamily: FONTS.interRegular,
    fontSize: 17,
    color: COLORS.darkText,
    lineHeight: 28,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  tag: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: FONTS.interMedium,
    fontSize: 14,
    color: COLORS.darkText,
  },
  relatedArticlesSection: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  relatedArticlesTitle: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 20,
    color: COLORS.darkText,
    marginBottom: 16,
  },
  relatedArticlesContainer: {
    paddingBottom: 16,
  },
  relatedArticleCard: {
    width: 250,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: COLORS.lightestGray,
    overflow: 'hidden',
  },
  relatedArticleImage: {
    width: '100%',
    height: 140,
  },
  relatedArticleContent: {
    padding: 12,
  },
  relatedArticleTitle: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: 8,
  },
  relatedArticleDate: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: COLORS.gray,
  },
});