import { useAuth } from '../../../hooks/useAuth.js';
import React, { useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useMessages } from '../../../hooks/useMessages.js';
import ChatInput from '../../ChatInput/ChatInput.jsx';
import NoMessages from '../../NoMessages/NoMessages.jsx';
import Message from '../../Message/Message.jsx';
import './TextChat.css'

const TextChat = () => {
  const { user } = useAuth();
  const { messagesState, addMessage } = useMessages();
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      messageBody: '',
    },
    validationSchema: yup.object().shape({
      messageBody: yup.string(),
    }),
    onSubmit: (values) => {
      if (values.messageBody.trim().length > 0 ) {
        const date = new Date();
        const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
        addMessage({
          messageBody: values.messageBody,
          userId: user.id,
          date: `${hours}:${minutes}`,
          username: user.username,
        });
      }
      formik.values.messageBody = '';
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesState]);


  const messages = useMemo(() => messagesState.map((message, i) => { 
    const isPrevUserMessage = messagesState[i - 1]?.userId === messagesState[i]?.userId;
    const isNextUserMessage = messagesState[i + 1]?.userId === messagesState[i]?.userId;
    
    return ( 
      <Message
        key={message.id}
        message={message}
        isMessageFirst={i === 0}
        isPrevUserMessage={isPrevUserMessage}
        isNextUserMessage={isNextUserMessage}
      />
    );
  }), [messagesState]);

  return (
    <div id="textChatContainer">
      <div id="textChatName">
        <p className="text h2-text">{t('chatPage.chat')}</p>
      </div>
      <div id="textChatLine"/>
      <div id="messagesContainer">
        {messagesState.length === 0 ? <NoMessages /> : messages}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={formik.handleSubmit} className="textChatFormContainer">
        <ChatInput
          valueProp={formik.values.messageBody}
          onChangeProp={formik.handleChange}
        />
      </form>
    </div>
  );
};

export default TextChat;
