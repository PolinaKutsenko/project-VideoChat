import React, { useState, useCallback, useEffect } from 'react';
import { createContext } from 'react';

import { useSocketApi } from '../hooks/useSocketApi.js';

export const UsersContext = createContext({});

const UsersProvider = ({ children }) => {
  const {socketSubscribe, socketEmit} = useSocketApi();
  const [usersState, setUsersState] = useState([]);
  
  const addUserFunc = useCallback((payload) => setUsersState((prevState) => (
    [...prevState, payload])), []);

  const getUsersFunc = useCallback((payload) => setUsersState(payload), []);
  
  const removeUserFunc = useCallback((payload) => setUsersState((prevState) => {
    return prevState.filter((user) => user.id !== payload);
  }), []);

  useEffect(() => {
    socketSubscribe('userAdd', addUserFunc);
    socketSubscribe('userGet', getUsersFunc);
    socketSubscribe('userRemove', removeUserFunc);
  }, [])

  const addUser = useCallback((userData) => {
    socketEmit('userAdd', userData);
  }, [socketEmit]);

  const getUsers = useCallback(() => {
    socketEmit('userGet', null);
  }, [socketEmit]);

  const removeUser = useCallback((userData) => {
    socketEmit('userRemove', userData);
  }, [socketEmit]);

  const removeAllLocalUsers = useCallback(() => {
    setUsersState([]);
  }, []);
    
  return (
    <UsersContext.Provider value={{
      usersState,
      addUser,
      getUsers,
      removeUser,
      removeAllLocalUsers,
    }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider; 
