import EndCallIcon from '../../icons/EndCallIcon.jsx';
import EndCallTooltip from '../../icons/EndCallTooltip.jsx';
import './EndCallButton.css';

const EndCallButton = ({endCallButtOnClick}) => {

  return (
    <>
    <button onClick={endCallButtOnClick} id="endCallIcon">
      <EndCallIcon className="endCallPosition" />
    </button>
    <div id="endCallTooltip"><EndCallTooltip /></div>
  </>
  );
}

export default EndCallButton;
