import { useTranslation } from 'react-i18next';

import NoMessageIcon from "../../icons/NoMessageIcon";
import './NoMessages.css';

const NoMessages = () => {
  const { t } = useTranslation();
  return (
    <div id="noMessageContainer">
        <NoMessageIcon />
        <div className="text sub-text">{t('chatPage.noMessagesYet')}</div>
    </div>
  );
}

export default NoMessages;