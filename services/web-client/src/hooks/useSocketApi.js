import { useContext } from 'react';

import { SocketApiContext } from '../contexts/SocketProvider';

export const useSocketApi = () => useContext(SocketApiContext);
