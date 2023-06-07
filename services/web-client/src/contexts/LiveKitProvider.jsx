import React, { useState, useCallback, useEffect } from 'react';
import { createContext } from 'react';
import { Room, RoomEvent } from 'livekit-client';

import { useSocketApi } from '../hooks/useSocketApi.js';
import liveKitUrl from '../const/liveKitURL.js';


export const LiveKitContext = createContext({});

const LiveKitProvider = ({ children }) => {
  const { socketSubscribe, socketEmit} = useSocketApi();
  const [token, setToken] = useState(null);
  const [usersTrack, setUsersTrack] = useState({});
  const [room, setRoom] = useState(null);


  const handleLocalParticipantConnected = (localParticipant) => {
    setUsersTrack((prevState) => ({...prevState, [localParticipant.identity]: {}}));
  }

  const handleLocalTrackPublished = (localTrackPublication, localParticipant) => {
    const newUserData = {};

    newUserData[`${localTrackPublication.kind}Track`] = localTrackPublication.track;
    newUserData[`is${localTrackPublication.kind}Mute`] = localTrackPublication.track.isMuted;

    setUsersTrack(prevState => ({
      ...prevState,
      [localParticipant.identity]: {
        ...prevState[localParticipant.identity],
        ...newUserData,
      }
    }));
  }

  const handleLocalTrackUnpublished = useCallback((localTrackPublication, localParticipant) => {
    setUsersTrack((prevState) => {
      const userTrack = prevState[localParticipant.identity];
      const {
        [`${localTrackPublication.kind}Track`]: userTrackData,
        [`is${localTrackPublication.kind}Mute`]: muteData,
         ...restTrack
      } = userTrack;

      if (!Object.keys(restTrack).length) {
        const { [localParticipant.identity]: deleteParticipant, ...prevStateWithoutUser } = prevState;

        return prevStateWithoutUser;
      } else {
        setToken(null);
        return {
          [localParticipant.identity]: {
            ...restTrack,
           }
        }
      }
    });
  }, []);

  const handleParticipantConnected = useCallback((remoteParticipant) => {
    setUsersTrack((prevState) => ({...prevState, [remoteParticipant.identity]: {}}));
  }, []);

  const handleRemoteTrackPublished = useCallback((remoteTrackPublication, remoteParticipant) => {
    const newUserData = {};

    newUserData[`${remoteTrackPublication.kind}Track`] = remoteTrackPublication.track;

    setUsersTrack(prevState => ({
      ...prevState,
      [remoteParticipant.identity]: {
        ...prevState[remoteParticipant.identity],
        ...newUserData,
      }
    }));
  }, []);

  const handleRemoteTrackUnpublished = useCallback((remoteTrackPublication, remoteParticipant) => {
    setUsersTrack((prevState) => {
      const userTrack = prevState[remoteParticipant.identity];
      const {
        [`${remoteTrackPublication.kind}Track`]: userTrackData,
        [`is${remoteTrackPublication.kind}Mute`]: muteData,
         ...restTrack
      } = userTrack;

      return {
        ...prevState,
        [remoteParticipant.identity]: {
          ...restTrack,
         }
      }
    });
  }, []);

  const handleTrackSubscribed = useCallback((remoteTrack, remoteTrackPublication, remoteParticipant) => {
    const newUserData = {};

    newUserData[`${remoteTrackPublication.kind}Track`] = remoteTrack;
    newUserData[`is${remoteTrackPublication.kind}Mute`] = remoteTrack.isMuted;

    setUsersTrack((prevState) => ({
        ...prevState,
        [remoteParticipant.identity]: {
          ...prevState[remoteParticipant.identity],
          ...newUserData,
        }
      }));
  }, []);

  const handleTrackUnsubscribed = useCallback((track, remoteTrackPublication, remoteParticipant) => {
    setUsersTrack((prevState) => {
      const userTrack = prevState[remoteParticipant.identity];
      const {
        [`${remoteTrackPublication.kind}Track`]: userTrackData,
        [`is${remoteTrackPublication.kind}Mute`]: muteData,
        ...restTrack
      } = userTrack;

      return {
        ...prevState,
        [remoteParticipant.identity]: {
          ...restTrack,
         }
      }
    });
  }, []);

  const handleTrackMuted = useCallback((trackPublication, participant) => {
    const newUserData = {};

    newUserData[`${trackPublication.kind}Track`] = trackPublication.track;
    newUserData[`is${trackPublication.kind}Mute`] = trackPublication.track.isMuted;

    setUsersTrack(prevState => ({
      ...prevState,
      [participant.identity]: {
        ...prevState[participant.identity],
        ...newUserData,
      }
    }));
  }, []);

  const handleTrackUnmuted = useCallback((trackPublication, participant) => {
    const newUserData = {};

    newUserData[`${trackPublication.kind}Track`] = trackPublication.track;
    newUserData[`is${trackPublication.kind}Mute`] = trackPublication.track.isMuted;

    setUsersTrack(prevState => ({
      ...prevState,
      [participant.identity]: {
        ...prevState[participant.identity],
        ...newUserData,
      }
    }));
  }, []);

  const handleParticipantDisconnected = useCallback((remoteParticipant) => {
    setUsersTrack((prevState) => {
      const { [remoteParticipant.identity]: deleteParticipant, ...prevStateWithoutUser } = prevState;
      return prevStateWithoutUser;
    });
  }, []);



  const initLiveKit = async (token) => {
    const room = new Room();
    setRoom(room);

    room
      .on(RoomEvent.LocalTrackPublished, handleLocalTrackPublished)
      .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished)
      .on(RoomEvent.ParticipantConnected, handleParticipantConnected)
      .on(RoomEvent.TrackPublished, handleRemoteTrackPublished)
      .on(RoomEvent.TrackUnpublished, handleRemoteTrackUnpublished)
      .on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
      .on(RoomEvent.TrackMuted, handleTrackMuted)
      .on(RoomEvent.TrackUnmuted, handleTrackUnmuted)
      .on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

    await room.connect(liveKitUrl, token);

    handleLocalParticipantConnected(room.localParticipant);

    await room.localParticipant.setCameraEnabled(true);
    await room.localParticipant.setMicrophoneEnabled(true);
  }

  const userCameraOn = useCallback(() => {
    room.localParticipant.setCameraEnabled(true);
  }, [room]);

  const userCameraOff = useCallback(() => {
    room.localParticipant.setCameraEnabled(false);
  }, [room]);

  const userMicOn = useCallback(() => {
    room.localParticipant.setMicrophoneEnabled(true);
  }, [room]);

  const userMicOff = useCallback(() => {
    room.localParticipant.setMicrophoneEnabled(false);
  }, [room]);


  const getTokenFunc = useCallback((payload) => {
    setToken(payload)
  }, []);
 
  useEffect(() => {
    socketSubscribe('videochatGetToken', getTokenFunc);
  }, []);

  useEffect(() => {
    if (token) {
      initLiveKit(token);
    }
  }, [token]);

  const getToken = useCallback((userData) => {
    socketEmit('videochatGetToken', userData);
  }, [socketEmit]);
  
  return (
    <LiveKitContext.Provider value={{
      room,
      getToken,
      usersTrack,
      userCameraOn,
      userCameraOff,
      userMicOn,
      userMicOff
    }}>
      {children}
    </LiveKitContext.Provider>
  );
};

export default LiveKitProvider;
