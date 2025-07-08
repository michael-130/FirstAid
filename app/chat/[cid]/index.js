import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { Stack } from "expo-router";
import { AppContext } from "../../../contexts/AppContext";
import { useHeaderHeight } from "@react-navigation/elements";

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
      <Stack.Screen options={{ title: "Channel Screen" }} />
      <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}