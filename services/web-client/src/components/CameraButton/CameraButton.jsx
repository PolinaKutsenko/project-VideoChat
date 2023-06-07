import React, { useMemo } from 'react';

import { useAuth } from '../../hooks/useAuth.js';
import { useLiveKit } from '../../hooks/useLiveKit.js';
import TurnOffCameraIcon from '../../icons/TurnOffCameraIcon.jsx';
import TurnOnCameraIcon from '../../icons/TurnOnCameraIcon.jsx';
import OnCameraIcon from '../../icons/OnCameraIcon.jsx';
import OffCameraIcon from '../../icons/OffCameraIcon.jsx';
import './CameraButton.css';

const CameraButton = () => {
  const auth = useAuth();
  const {
    usersTrack,
    userCameraOn,
    userCameraOff,
  } = useLiveKit();

  const currentUserTrack = usersTrack[auth?.user?.id];
  
  const cameraButtonState = useMemo(() => {
    if (currentUserTrack) {
      return !currentUserTrack.isvideoMute;
    } else if (!currentUserTrack) {
      return true;
    }
  }, [currentUserTrack]);

  const cameraButtOnClick = () => {
    return cameraButtonState ? userCameraOff() : userCameraOn();
  }
  
  return (
    <>
      <button onClick={cameraButtOnClick} id="cameraIcon">
        {cameraButtonState && <OnCameraIcon className="cameraPosition" />}
        {!cameraButtonState && <OffCameraIcon className="cameraPosition" />}
      </button>
      <div id="cameraTooltip">{cameraButtonState ? 
        <TurnOffCameraIcon /> : <TurnOnCameraIcon />}</div>
    </>
  );
}

export default CameraButton;
