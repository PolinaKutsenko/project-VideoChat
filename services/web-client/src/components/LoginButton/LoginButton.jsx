import { useTranslation } from 'react-i18next';

import './LoginButton.css';

const LoginButton = () => {
  const { t } = useTranslation();

  return (
    <button id="loginButton" type="submit">
      <p className="text button-text button-text-flex">{t('loginPage.joinRoomButton')}</p>
    </button>
  );
}

export default LoginButton;
