import { useContext } from 'react';

import { UsersContext } from '../contexts/UsersProvider';

export const useUsers = () => useContext(UsersContext);
