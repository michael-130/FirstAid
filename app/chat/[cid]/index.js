import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useContext } from "react";
import { SafeAreaView, Text } from "react-native";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { ChatWrapper } from "../../../components/ChatWrapper";
import { AppContext } from "../../../contexts/AppContext";

export default function ChannelScreen() {
  const { channel } = useContext(AppContext);
  const headerHeight = useHeaderHeight();

  if (!channel) {
    return (
      <SafeAreaView>
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatWrapper>
        <Stack.Screen options={{ title: "Channel Screen" }} />
        <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
          <MessageList />
          <MessageInput />
        </Channel>
      </ChatWrapper>
    </SafeAreaView>
  );
}