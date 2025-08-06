import { auth } from './firebase';

export type ChatConfig = {
  chatApiKey: string;
  chatUserId: string;
  chatUserName: string;
  chatUserToken: string;
};

export const getChatConfig = async (): Promise<ChatConfig> => {
  const user = auth.currentUser;
  if (!user || !user.phoneNumber) {
    throw new Error('User not authenticated or missing phone number');
  }

  // 🔒 Подставьте актуальные токены и id
  const phone = user.phoneNumber;

  switch (phone) {
    case '+8615822704303':
      return {
        chatApiKey: 'b9uzxtcj7c7x',
        chatUserId: '8615822704303',
        chatUserName: 'Roman',
        chatUserToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODYxNTgyMjcwNDMwMyJ9.i6-tzQHBto8eyir9FiHyQz8UGgyFZ0vU2tS22cuPqMM',
      };

    case '+8618222655873':
      return {
        chatApiKey: 'b9uzxtcj7c7x',
        chatUserId: '8618222655873',
        chatUserName: 'Michael',
        chatUserToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODYxODIyMjY1NTg3MyJ9.llN7B2PTpGR6XTeu6jg5_9P5c2nj9giUHPcgYZC1Tvc',
      };

    default:
      throw new Error(`No chat config defined for phone number: ${phone}`);
  }
};
