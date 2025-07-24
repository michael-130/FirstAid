import { StyleSheet, View, Text, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ChannelList } from "stream-chat-expo";
import { chatUserId } from "../../chatConfig";
import { useContext, useMemo } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AppContext } from '../../contexts/AppContext';
import { ChatWrapper } from "@/components/ChatWrapper";

const filters = {
  members: { $in: [chatUserId] },
  type: "messaging",
};
const sort = { last_updated: -1 };
const options = {
  state: true,
  watch: true,
};

export default function ChannelListScreen() {
  const router = useRouter();
  const { setChannel } = useContext(AppContext);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D5A" />
      
      {/* Header */}
      <LinearGradient
        colors={['#2E7D5A', '#4A9B6E']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>专业咨询</Text>
              <Text style={styles.headerSubtitle}>与护理专家在线交流</Text>
            </View>
            <MaterialIcons name="support-agent" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      <ChatWrapper>
        <View style={styles.container}>
          <ChannelList
            onSelect={(channel) => {
              setChannel(channel);
              router.push(`/chat/${channel.cid}`);
            }}
          />
        </View>
      </ChatWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
});