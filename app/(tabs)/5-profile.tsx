import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function Home() {
    const router = useRouter();

  const handleLogin = () => {
    router.push('../auth/login');
  };

  return (
    <View style={styles.container}>
      <Text >要开始聊天，请先登录</Text>
      <Button title="登录" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});