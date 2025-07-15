// Service Type
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  location: string;
  imageUrl: string;
  providerName: string;
  providerImageUrl: string;
  availability?: string[];
}

// Appointment Type
export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  location: string;
  providerName: string;
  providerImageUrl: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

// Article/News Type
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  tags: string[];
}

// User Profile Type
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  favorites: string[];
  preferences: {
    categories: string[];
    notifications: boolean;
    newsletter: boolean;
  };
}

// Category Type
export interface Category {
  id: string;
  name: string;
  iconUrl: string;
}

// Review Type
export interface Review {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  userImageUrl: string;
  rating: number;
  comment: string;
  date: string;
}

// Time Slot Type
export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}