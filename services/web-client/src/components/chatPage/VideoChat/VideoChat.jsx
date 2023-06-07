import React, { useCallback } from 'react';

import Cat1Icon from '../../../icons/Cat1Icon.jsx';
import Cat2Icon from '../../../icons/Cat2Icon.jsx';
import Cat3Icon from '../../../icons/Cat3Icon.jsx';
import Cat4Icon from '../../../icons/Cat4Icon.jsx';
import VideoContainer from '../../VideoContainer/VideoContainer.jsx';
import { useUsers } from '../../../hooks/useUsers.js';
import './VideoChat.css';

const VideoChat = () => {
  const { usersState } = useUsers();

  const catIcons = { 
    1: Cat4Icon,
    2: Cat3Icon,
    3: Cat2Icon,
    4: Cat1Icon,
  }

  const getUser = useCallback((num) => usersState[num-1] ? usersState[num-1] : null, [usersState]);
  const getCatIcon = useCallback((num) => catIcons[`${num}`], []);

  return (
    <div id="videoChatContainer">
      <div className="videoChatContainerRow">
        <VideoContainer userData={getUser(1)} CatIcon={getCatIcon(1)} />
        <VideoContainer userData={getUser(2)} CatIcon={getCatIcon(2)} />
      </div>
      <div className="videoChatContainerRow">
        <VideoContainer userData={getUser(4)} CatIcon={getCatIcon(4)} />
        <VideoContainer userData={getUser(3)} CatIcon={getCatIcon(3)} />
      </div>
    </div>
  );
};

export default VideoChat;
