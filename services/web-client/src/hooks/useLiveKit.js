import { useContext } from 'react';

import { LiveKitContext } from '../contexts/LiveKitProvider';

export const useLiveKit = () => useContext(LiveKitContext);