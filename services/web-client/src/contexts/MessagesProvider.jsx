import React, { useState, useCallback, useEffect } from 'react';
import { createContext } from 'react';

import { useSocketApi } from '../hooks/useSocketApi.js';

export const MessagesContext = createContext({});

const MessagesProvider = ({ children }) => {
  const { socketSubscribe, socketEmit} = useSocketApi();
  const [messagesState, setMessagesState] = useState([]);

  const newMessageFunc = useCallback((payload) => setMessagesState((prevState) => (
    [...prevState, payload])), []);

  const getMessagesFunc = useCallback((payload) => setMessagesState(payload), []);
 
  useEffect(() => {
    socketSubscribe('messageAdd', newMessageFunc);
    socketSubscribe('messageGet', getMessagesFunc);
  }, []);

  const addMessage = useCallback((messageData) => {
    socketEmit('messageAdd', messageData);
  }, [socketEmit]);

  const getMessages = useCallback(() => {
    socketEmit('messageGet', null);
  }, [socketEmit])
  
  return (
    <MessagesContext.Provider value={{ messagesState, addMessage, getMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
