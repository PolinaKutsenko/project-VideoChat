import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useAuth } from '../../hooks/useAuth.js';
import './Message.css';

const Message = ({ message, isMessageFirst, isPrevUserMessage, isNextUserMessage }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { messageBody, userId, date, username } = message;

  const isCurrentUserMessage = userId === user.id;

  const messageContainerClass = cn('messageContainer', {
    marginBottom: !isNextUserMessage,
    firstMessageMarginTop: isMessageFirst,
    borderRadiusStart: isPrevUserMessage && !isCurrentUserMessage,
    borderRadiusEnd: isPrevUserMessage && isCurrentUserMessage,
  });

  const userNameForMessageClass = cn('userNameForMessage', 'text', 'sub-bold-text', {
    purple: !isCurrentUserMessage,
    blue: isCurrentUserMessage,
  });

  const messageFlexContainerClass = cn('messageFlexContainer', {
    start: !isCurrentUserMessage,
    end: isCurrentUserMessage,
  });

  return (
    <div className={messageFlexContainerClass}>
      <div className={messageContainerClass}>
        {!isPrevUserMessage && <div className={userNameForMessageClass}>
          {isCurrentUserMessage ? t('chatPage.You') : username}
        </div>}
        <div className="messageTextContainer text sub-text">
          <div className="messageText">{messageBody}</div>
          <div className="messageDote"><div>·</div></div>
          <div className="messageData"><div>{date}</div></div>
        </div>
      </div>
    </div>
  );
}

export default Message;
