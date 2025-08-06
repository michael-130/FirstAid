import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

import { getChatConfig } from '../chatConfig';

export const ChatWrapper = ({ children }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { chatApiKey, chatUserId, chatUserName, chatUserToken } =
          await getChatConfig();

        const chatClient = StreamChat.getInstance(chatApiKey);

        await chatClient.connectUser(
          {
            id: chatUserId,
            name: chatUserName,
          },
          chatUserToken
        );

        console.log('✅ Connected to Stream as', chatUserId);
        setClient(chatClient);
      } catch (err) {
        console.error('❌ Stream connection error:', err);
      }
    };

    init();
  }, []);

  if (!client) {
    return (
      <SafeAreaView>
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};
