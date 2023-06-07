import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContext } from 'react';

import { useSocketApi } from '../hooks/useSocketApi.js';
import { useUsers } from '../hooks/useUsers.js';
import { useLiveKit } from '../hooks/useLiveKit.js';

import routes from '../const/routes.js';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const { socketSubscribe, socketEmit} = useSocketApi();
  const { removeUser } = useUsers();
  const livekit = useLiveKit();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginData, setLogindata]= useState({});

  const loginUserFunc = ({ data, error }) => {
    setLogindata({ data, error });    
  };

  const disconnectFunc = useCallback(() => {
    removeUser(user);
    setUser(null);
    setLogindata(null);
    navigate(routes.loginPagePath());
  }, [removeUser, user]);

  useEffect(() => {
    if (loginData?.data || loginData?.error) {
      setUser(loginData.data);
      if (loginData.error) {
        navigate(routes.fullRoomPagePath());
        return;
      } else {
        navigate(routes.chatPagePath());
      }
    }
  }, [loginData])

  useEffect(() => {
    if (user) {
      livekit.getToken(user);
    }
  }, [user])

  useEffect(() => {
    socketSubscribe('userLogin', loginUserFunc);
    socketSubscribe('disconnect', disconnectFunc);
  }, [])

  const logIn = useCallback((userNameObj) => {
    socketEmit('userLogin', userNameObj);
  }, [socketEmit]);

  const logOut = useCallback(() => {
    setUser(null);
    setLogindata(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 
