import React, { useMemo } from 'react';

import { useAuth } from '../../hooks/useAuth.js';
import { useLiveKit } from '../../hooks/useLiveKit.js';
import TurnOffMicIcon from '../../icons/TurnOffMicIcon.jsx';
import TurnOnMicIcon from '../../icons/TurnOnMicIcon.jsx';
import OnMicIcon from '../../icons/OnMicIcon.jsx';
import OffMicIcon from '../../icons/OffMicIcon.jsx';
import './MicButton.css';

const MicButton = () => {
  const auth = useAuth();
  const {
    usersTrack,
    userMicOn,
    userMicOff
  } = useLiveKit();

  const currentUserTrack = usersTrack[auth?.user?.id];
  
  const micButtonState = useMemo(() => {
    if (currentUserTrack) {
      return !currentUserTrack.isaudioMute;
    } else if (!currentUserTrack) {
      return true;
    }
  }, [currentUserTrack]);

  const micButtOnClick = () => {
    return micButtonState ? userMicOff() : userMicOn();
  };

  return (
    <>
      <button onClick={micButtOnClick} id="micIcon">
        {micButtonState && <OnMicIcon className="micPosition" />}
        {!micButtonState && <OffMicIcon className="micPosition" />}
      </button>
      <div id="micTooltip">{micButtonState ? 
      <TurnOffMicIcon /> : <TurnOnMicIcon />}</div>
    </>
  );
}

export default MicButton;