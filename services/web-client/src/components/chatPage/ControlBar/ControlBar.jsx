import React, { useCallback } from 'react';

import { useAuth } from '../../../hooks/useAuth.js';
import { useUsers } from '../../../hooks/useUsers.js';
import { useLiveKit } from '../../../hooks/useLiveKit.js';
import MicButton from '../../MicButton/MicButton.jsx';
import CameraButton from '../../CameraButton/CameraButton.jsx';
import EndCallButton from '../../EndCallButton/EndCallButton.jsx';
import './ControlBar.css';

const ControlBar = () => {
  const auth = useAuth();
  const users = useUsers();
  const { room } = useLiveKit();
    
  const endCallButtOnClick = useCallback(() => {
    room.disconnect();
    users.removeUser(auth.user);
    users.removeAllLocalUsers();
    auth.logOut();
  }, [users.removeUser, auth.user, auth.logOut, room]);

  return (
    <div id="controlBarContainer">
      <MicButton />
      <CameraButton />
      <EndCallButton endCallButtOnClick={endCallButtOnClick} />
    </div>
  );
};

export default ControlBar;
