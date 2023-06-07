import React, { useEffect } from 'react';

import { useUsers } from '../../hooks/useUsers.js';
import { useMessages } from '../../hooks/useMessages.js';
import TextChat from '../../components/chatPage/TextChat/TextChat.jsx';
import VideoChat from '../../components/chatPage/VideoChat/VideoChat.jsx';
import ControlBar from '../../components/chatPage/ControlBar/ControlBar.jsx';
import './ChatPage.css'


const ChatPage = () => {
  const users = useUsers();
  const messages = useMessages();

  useEffect(() => {
    users.getUsers();
    messages.getMessages();
  }, []);

  return (
    <div id="chatPageContainer">
      <TextChat />
      <VideoChat />
      <ControlBar />
    </div>
  );
};

export default ChatPage;
