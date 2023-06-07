import { io } from 'socket.io-client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createContext } from 'react';

import serverURL from '../const/serverURL.js';

export const SocketApiContext = createContext({});

const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const delayedSubscribes = useRef([]);
  const delayedEvents = useRef([]);
  const [isConnected, setIsConnected] = useState(false);

  const socketSubscribe = useCallback((eventName, func) => {
    if (isConnected) {
      socket.current.on(eventName, func);
    } else {
      delayedSubscribes.current.push({eventName, func})
    }
  }, [isConnected]);

  const socketEmit = useCallback((eventName, payload) => {
    if (isConnected) {
      socket.current.emit(eventName, payload);
    } else {
      delayedEvents.current.push({eventName, payload})
    }
  }, [isConnected]);
  
  const socketInit = (socketURL) => {
    const socketInstance = io(socketURL);
    socket.current = socketInstance;

    socketInstance.on('connect', () => {
      delayedEvents.current.map((event) => {
        socket.current.emit(event.eventName, event.payload, (response) => {
          if (response.status !== 'ok') {
            throw new Error('Network error!');
          }
        });
      });

      delayedEvents.current = [];
      setIsConnected(true);
    });

    delayedSubscribes.current.map((event) => {
      socket.current.on(event.eventName, event.func);
      delayedSubscribes.current = [];
    });
  };

  useEffect(() => {
    socketInit(serverURL);
  }, []);


  return (
    <SocketApiContext.Provider value={{ socket: socket.current, isConnected, socketSubscribe, socketEmit }}>
      {children}
    </SocketApiContext.Provider>
  );
};

export default SocketProvider;
