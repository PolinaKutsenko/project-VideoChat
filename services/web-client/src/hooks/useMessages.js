import { useContext } from 'react';

import { MessagesContext } from '../contexts/MessagesProvider';

export const useMessages = () => useContext(MessagesContext);
