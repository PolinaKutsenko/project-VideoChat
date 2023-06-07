import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import routes from '../../const/routes.js';
import './FullRoomButton.css';

const FullRoomButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const buttonClick = () => navigate(routes.chatPagePath());

  return (
    <button id="fullRoomButton" onClick={buttonClick}>
      <p id="fullRoomText" className="text primary-button-text">
        {t('fullRoomPage.backButton')}
      </p>
    </button>
  );
}

export default FullRoomButton;
