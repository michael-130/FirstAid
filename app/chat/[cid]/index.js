import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useContext } from "react";
import { SafeAreaView, Text, Platform } from "react-native";
import { AppContext } from "../../../contexts/AppContext";
import { ChatWrapper } from "../../../components/ChatWrapper";

export default function ChannelScreen() {
  const { channel } = useContext(AppContext);
  const headerHeight = useHeaderHeight();

  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chat is not supported on web.</Text>
      </SafeAreaView>
    );
  }

  // Dynamic import for native-only chat components
  const { Channel, MessageList, MessageInput } = require("stream-chat-expo");

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
