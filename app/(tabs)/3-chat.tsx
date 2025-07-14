import { StyleSheet, View } from "react-native";
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});