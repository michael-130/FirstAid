import { Article } from "./types";

export const articles: Article[] = [
  {
    id: '1',
    title: "管理照护者倦怠：自我照顾策略",
    excerpt: '照护者常常忽略自己的身心健康。了解如何预防倦怠并保持情绪平衡。',
    content: '照护工作可能在身体和心理上都很有挑战。为了提供最佳照护，照护者需要抽时间充电并关注自身需求。倦怠的迹象包括疲劳、易怒、睡眠问题以及对日常活动失去兴趣。简单的自我照顾策略包括设定界限、定期休息、保持社交联系，以及寻求照护者支持小组的帮助。练习正念或短时间散步也有助于减轻压力。记住，寻求帮助是一种力量，而不是弱点。',
    imageUrl: 'https://images.pexels.com/photos/6646904/pexels-photo-6646904.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '心理支持',
    publishedAt: '2025-06-01',
    readTime: 5,
    author: {
      name: 'Karen Brooks',
      avatarUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    tags: ['照护者', '倦怠', '自我照顾', '减压'],
  },
  {
    id: '2',
    title: '照护者安全搬运技巧',
    excerpt: '使用这些实用的身体力学技巧，在转移或搬运病人时避免受伤。',
    content: '照护者面临的常见风险之一是搬运或移动病人时受伤。学习正确的身体力学非常重要。双脚与肩同宽，膝盖弯曲，尽量让病人靠近身体。避免扭转动作，并尽可能使用辅助搬运工具。如果感到吃力或不确定，请寻求帮助。保护自身健康是长期提供优质照护的前提。',
    imageUrl: 'https://images.pexels.com/photos/6647117/pexels-photo-6647117.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '护理技巧',
    publishedAt: '2025-06-03',
    readTime: 6,
    author: {
      name: 'Jason Lee',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    tags: ['搬运', '移动', '防止受伤', '安全'],
  },
  {
    id: '3',
    title: '理解痴呆症行为触发因素',
    excerpt: '了解小环境或情绪变化如何影响痴呆患者，并学习如何冷静应对。',
    content: '痴呆症患者常因压力而表现出攻击、退缩或困惑等行为。常见触发因素包括过度刺激、噪音、陌生面孔或日常习惯变化。作为照护者，应保持语气平和，减少背景噪音，并提供清晰、温和的沟通。学会识别并提前预防触发因素，有助于提高照护者和患者的生活质量。',
    imageUrl: 'https://images.pexels.com/photos/7551675/pexels-photo-7551675.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '认知护理',
    publishedAt: '2025-06-05',
    readTime: 7,
    author: {
      name: 'Sophia Chen',
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    tags: ['痴呆症', '行为', '老年护理', '共情'],
  },
  {
    id: '4',
    title: '与老年客户的有效沟通',
    excerpt: '提升信任、减少困惑，并在照护过程中促进合作的实用技巧。',
    content: '沟通不仅是语言，还包括语气、时机和非语言信号。对于老年人，尤其是有听力或认知障碍的人，简单明了的沟通至关重要。面向对方，清晰讲话，避免催促。经常称呼他们的名字，并确认理解。通过一致性、耐心和善意建立关系，将提高合作和信任感。',
    imageUrl: 'https://images.pexels.com/photos/7551640/pexels-photo-7551640.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '人际技能',
    publishedAt: '2025-06-07',
    readTime: 5,
    author: {
      name: 'David Williams',
      avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    tags: ['沟通', '老年护理', '信任', '客户关系'],
  },
];
