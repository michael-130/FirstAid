import NewsCard from "@/components/NewsCard";
import { COLORS, FONTS } from '@/utils/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { articles } from '../../utils/data';

type CategoryFilter =
  'All'
  | 'Mental Support'
  | 'Care Techniques'
  | 'Cognitive Care'
  | 'Interpersonal Skills';

export default function NewsScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categories: CategoryFilter[] = [
    'All',
    'Mental Support',
    'Care Techniques',
    'Cognitive Care',
    'Interpersonal Skills',
  ];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(article => article.category === activeCategory);

  const featuredArticle = articles[0];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D5A" />
      <LinearGradient
        colors={['#2E7D5A', '#4A9B6E']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              {/* <Text style={styles.greeting}>您好！</Text> */}
              <Text style={styles.welcomeText}>健康咨询</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialIcons name="notifications" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBar}>
              <Search size={20} color={COLORS.gray} />
              <Text style={styles.searchText}>
                Search articles...
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    activeCategory === category && styles.activeCategoryButton,
                  ]}
                  onPress={() => setActiveCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      activeCategory === category && styles.activeCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
      {/* <SafeAreaView style={styles.safeArea}> */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {featuredArticle && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Article</Text>
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => router.push({
                pathname: '/news/[id]',
                params: { id: featuredArticle.id },
              })}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: featuredArticle.imageUrl }}
                style={styles.featuredImage}
                resizeMode="cover"
              />
              <View style={styles.featuredOverlay}>
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredCategory}>
                    {featuredArticle.category}
                  </Text>
                  <Text style={styles.featuredTitle} numberOfLines={2}>
                    {featuredArticle.title}
                  </Text>
                  <Text style={styles.featuredMeta}>
                    {format(new Date(featuredArticle.publishedAt), 'MMM d, yyyy')} · {featuredArticle.readTime} min read
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.latestSection}>
          <Text style={styles.sectionTitle}>Latest Articles</Text>
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
}

import { format } from 'date-fns';
import { Image } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightestGray,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginTop: 8,
  //   marginBottom: 16,
  // },
  title: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 24,
    color: COLORS.darkText,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchText: {
    fontFamily: FONTS.interRegular,
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 12,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesList: {
    paddingBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontFamily: FONTS.interMedium,
    fontSize: 14,
    color: COLORS.darkText,
  },
  activeCategoryText: {
    color: COLORS.white,
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 18,
    color: COLORS.darkText,
    marginBottom: 16,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 240,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundGradient: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  featuredContent: {

  },
  featuredCategory: {
    fontFamily: FONTS.interSemiBold,
    fontSize: 14,
    color: COLORS.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredTitle: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 20,
    color: COLORS.white,
    marginBottom: 8,
  },
  featuredMeta: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: COLORS.lightGray,
  },
  latestSection: {
    marginBottom: 24,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,


  },
  headerContent: {
    flex: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});