import { Article } from "./types";

export const articles: Article[] = [
  {
    id: '1',
    title: 'Managing Caregiver Burnout: Self-Care Strategies',
    excerpt: 'Caregivers often forget their own well-being. Learn how to prevent burnout and maintain emotional balance.',
    content: 'Caregiving can be physically and emotionally demanding. To provide the best care, it’s important that caregivers take time to recharge and attend to their own needs. Signs of burnout include fatigue, irritability, sleep issues, and loss of interest in usual activities.\\n\\nSimple self-care strategies include setting boundaries, taking regular breaks, staying socially connected, and seeking support from caregiver groups.\\n\\nIncorporating mindfulness or short walks can also help reduce stress. Remember, asking for help is a strength, not a weakness.',
    imageUrl: 'https://images.pexels.com/photos/6646904/pexels-photo-6646904.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Mental Support',
    publishedAt: '2025-06-01',
    readTime: 5,
    author: {
      name: 'Karen Brooks',
      avatarUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    tags: ['caregiver', 'burnout', 'self-care', 'stress relief'],
  },
  {
    id: '2',
    title: 'Safe Lifting Techniques for Caregivers',
    excerpt: 'Avoid injuries while transferring or lifting patients with these practical body mechanics tips.',
    content: 'One of the most common risks for caregivers is injury from lifting or moving patients. Learning proper body mechanics is essential.\\n\\nKeep your feet shoulder-width apart, bend from the knees, and keep the person close to your body when lifting. Avoid twisting motions and always use transfer aids when possible.\\n\\nIf you feel strain or uncertainty, ask for assistance. Your long-term ability to provide care depends on protecting your own health first.',
    imageUrl: 'https://images.pexels.com/photos/6647117/pexels-photo-6647117.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Care Techniques',
    publishedAt: '2025-06-03',
    readTime: 6,
    author: {
      name: 'Jason Lee',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    tags: ['lifting', 'mobility', 'injury prevention', 'safety'],
  },
  {
    id: '3',
    title: 'Understanding Dementia Behavior Triggers',
    excerpt: 'Discover how small environmental or emotional cues can affect people with dementia and how to respond calmly.',
    content: 'People with dementia often respond to stressors with behaviors like aggression, withdrawal, or confusion.\\n\\nCommon triggers include overstimulation, loud noises, unfamiliar faces, or changes in routine. As a caregiver, try to maintain a calm tone, reduce background noise, and offer clear, gentle communication.\\n\\nLearning to recognize and prevent triggers early can improve quality of life for both caregiver and client.',
    imageUrl: 'https://images.pexels.com/photos/7551675/pexels-photo-7551675.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Cognitive Care',
    publishedAt: '2025-06-05',
    readTime: 7,
    author: {
      name: 'Sophia Chen',
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    tags: ['dementia', 'behavior', 'elder care', 'empathy'],
  },
  {
    id: '4',
    title: 'Effective Communication with Elderly Clients',
    excerpt: 'Tips to enhance trust, reduce confusion, and promote cooperation during caregiving routines.',
    content: 'Communication is more than words—it’s tone, timing, and non-verbal signals. For elderly individuals, especially those with hearing or cognitive challenges, simple communication can make all the difference.\\n\\nFace the person, speak clearly, and avoid rushing. Use their name often and confirm understanding.\\n\\nBuilding rapport through consistency, patience, and kindness will improve cooperation and trust.',
    imageUrl: 'https://images.pexels.com/photos/7551640/pexels-photo-7551640.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Interpersonal Skills',
    publishedAt: '2025-06-07',
    readTime: 5,
    author: {
      name: 'David Williams',
      avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    tags: ['communication', 'elder care', 'trust', 'client relationship'],
  },
];
