import { useTranslation } from 'react-i18next';

import Cat4Icon from '../../icons/Cat4Icon.jsx';
import FullRoomButton from '../../components/FullRoomButton/FullRoomButton.jsx';
import './FullRoomPage.css';

const FullRoomPage = () => {
    const { t } = useTranslation();

    return (
        <div className="full-room">
          <div className="full-room-container">
            <Cat4Icon id="cat4" />
            <div className="full-room-button-container">
              <h1 id="room-is-full" className="text h1-text">
                {t('fullRoomPage.fullRoom')}
              </h1>
              <FullRoomButton />
            </div>
          </div>
        </div>
    )
};

export default FullRoomPage;
