import ChatInputButtonIcon from '../../icons/ChatInputButtonIcon';
import './ChatInput.css';

const ChatInput = ({ valueProp, onChangeProp }) => {

  return (
    <>
    <label htmlFor="messageBody" className="textChatInput">
      <input
          type="text"
          id="messageBody"
          name="messageBody"
          placeholder="Start typing"
          value={valueProp}
          onChange={onChangeProp}
          className="text p-text"
      />
    </label>
    <button type="submit" id="chatInputButtonIcon">
      <ChatInputButtonIcon className="inputButtonIcon" />
    </button>
    </>
  );
}

export default ChatInput;
