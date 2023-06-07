import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import OffMicIconWhite from '../../icons/OffMicIconWhite.jsx';
import OnMicIconWhite from '../../icons/OnMicIconWhite.jsx';
import OffMicIconWhiteMini from '../../icons/OffMicIconWhiteMini.jsx';
import OnMicIconWhiteMini from '../../icons/OnMicIconWhiteMini.jsx';
import { useLiveKit } from '../../hooks/useLiveKit.js';
import { useAuth } from '../../hooks/useAuth.js';
import './VideoContainer.css';

const VideoContainer = ({ userData, CatIcon }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { usersTrack } = useLiveKit();
  const htmlAudioElement = useRef();
  const htmlVideoElement = useRef();

  const isCurrentUserVideo = userData?.id === user.id;
  const currentUserTrack = useMemo(() => usersTrack[userData?.id], [usersTrack]);


  const micButtonState = useMemo(() => {
    return currentUserTrack?.audioTrack ? !currentUserTrack.audioTrack?.isMuted : true;
  }, [usersTrack]);

  const cameraButtonState = useMemo(() => {
    return currentUserTrack?.videoTrack ? !currentUserTrack.videoTrack?.isMuted : true;
  }, [usersTrack]);

  const videoClasses = cn('video', {
    currentUserVideo: isCurrentUserVideo,
  });
  
  useEffect(() => {
    if (currentUserTrack?.videoTrack && cameraButtonState && htmlVideoElement.current) {
      htmlVideoElement.current.srcObject = currentUserTrack?.videoTrack.mediaStream;
    }
  }, [currentUserTrack?.videoTrack, isCurrentUserVideo, cameraButtonState]);

  useEffect(() => {
    if (currentUserTrack?.audioTrack && !isCurrentUserVideo && micButtonState && htmlAudioElement.current) {
      htmlAudioElement.current.srcObject = currentUserTrack?.audioTrack.mediaStream;
    }
  }, [currentUserTrack?.audioTrack, isCurrentUserVideo, micButtonState, cameraButtonState]);


  const offVideo = useMemo(() => (
    <>
      <div className="videoOffContainer">
        {micButtonState ? <OnMicIconWhite /> : <OffMicIconWhite />}
        <div className="text h2-text">
          {isCurrentUserVideo && <div>{`${userData?.username} (${t('chatPage.you')})`}</div>}
          {!isCurrentUserVideo && <div>{userData?.username}</div>}
        </div>
      </div>
      <div className="audioWithOffVideo">
        <audio ref={htmlAudioElement} autoPlay></audio>
      </div>
    </>
  ), [micButtonState, isCurrentUserVideo, userData?.username, micButtonState]);

  const onVideo = useMemo(() => {
    return (<>
      <div className="nameOnVideoFlexContainer">
        {micButtonState ? <OnMicIconWhiteMini /> : <OffMicIconWhiteMini />}
        <div className="text sub-text">
          {isCurrentUserVideo && <div>{`${userData?.username} (${t('chatPage.you')})`}</div>}
          {!isCurrentUserVideo && <div>{userData?.username}</div>}
        </div>
      </div>
      <div>
        <video className={videoClasses} ref={htmlVideoElement} autoPlay playsInline></video>
        <audio ref={htmlAudioElement} autoPlay></audio>
      </div>
    </>)
  }, [micButtonState, isCurrentUserVideo, userData?.username, htmlVideoElement, videoClasses]);

  const audioAndVideo = useMemo(() => {
    if (currentUserTrack?.videoTrack && cameraButtonState) {
      return onVideo;
    } else if (!currentUserTrack?.videoTrack || !cameraButtonState) {
      return currentUserTrack?.isvideoMute ? offVideo : onVideo;
    }
  }, [currentUserTrack, cameraButtonState, offVideo, onVideo]);


  return (
    <div className="videoFlexContainer">
      {!userData ? <CatIcon /> : audioAndVideo}
    </div>
  );
}

export default VideoContainer;
