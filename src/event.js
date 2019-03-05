import React,  { Fragment, useState } from 'react';
import { sendToLocalStorage } from './utils';
import Popup from './modal';
import './styles/event.css';

function deleteEv(e, callback) {
  localStorage.removeItem(e);

  if(callback) {
    callback();
  }
}

function editData(e, el, callback) {
  e.preventDefault();
  const form = e.target;
  sendToLocalStorage(form, callback, true);
}

const Event = ({data, date}) => {
  const [isPopupActive, togglePopup] = useState(false);
  let [evTimeStamp, setEvTimeStamp] = useState();
  let [evData, setEvData] = useState();

  const getPopup = (e, el) => {
     e.preventDefault();
     togglePopup(true);
     setEvTimeStamp(new Date(el.startdate));
     setEvData(el);
  }

  function inversePopupBool() {
    togglePopup(!isPopupActive);
  }

  function closePopupAndReload() {
    togglePopup(false);
    window.location.reload();
  }

  return (
    <Fragment>
      {isPopupActive === true &&
        (<Popup
          data={evData}
          timeStamp={evTimeStamp}
          togglePopup={()=>inversePopupBool()}
          formsubmittext={'Edit event'}
          onFormSubmission={(e) => editData(e, evData, closePopupAndReload)}
          onDelete={() => deleteEv(evData.index, closePopupAndReload)}
        />)
      }
      {data.map((el, idx) => (
          <div
            key={idx}
            data={data}
            className="event"
            onClick={(e) => {getPopup(e, el)}}>
            {el.subject}
          </div>
        )
      )}
    </Fragment>
  )
}

export default Event;
