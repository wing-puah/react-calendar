import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import CalendarDays from './daysRendering';
import Popup from './modal';
import { sendToLocalStorage } from './utils';

import './styles/calendar.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function Days(props) {
  const { timeStamp } = props;
  const [isPopupActive, togglePopup] = useState(false);

  function inversePopupBool() {
    togglePopup(!isPopupActive);
  }

  return (
    <Fragment>

      {isPopupActive === true &&
        (<Popup
          timeStamp={timeStamp}
          togglePopup={()=>inversePopupBool()}
          onFormSubmission={(e) => saveData(e, () => {
            inversePopupBool();
            setInterval(function() {
              window.location.reload();
            }, 1000)}
          )}
          formsubmittext={'Add event'}
          />)}
      <div className="calendar__header">
        {days.map((el, idx) => (
          <div className="calendar__col" key={idx}>
            {el}
          </div>
        ))}
      </div>
      <div className="calendar__body">
        <CalendarDays
          timeStamp={timeStamp} />
      </div>
      <div
        className="addEventBtn"
        onClick={(e) => inversePopupBool()}>
        <div className="btn">&#43;</div>
      </div>
    </Fragment>
  )
}

Days.propTypes = {
  timeStamp: PropTypes.object.isRequired,
}

function saveData(e, callback) {
  e.preventDefault();
  const form = e.target;
  sendToLocalStorage(form)
  if (callback) { callback() };
}

export default Days;
