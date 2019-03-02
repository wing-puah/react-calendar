import React,  { Fragment, useState } from 'react';
import Popup from './modal';
import { sendToLocalStorage } from './utils';
import './styles/event.css'

const deleteEv = (e, callback) => {
  localStorage.removeItem(e);

  if(callback) {
    callback();
  }
}

const Event = ({data}) => {
  return (
    <div className="event">
      {data}
      Return this event lor.
    </div>
  )
}

export default Event;

// const Event = (props) => {
//   // const { date, details } = props;
//   // const detailsArr = details.map((el, idx) => (JSON.parse(el)) );
//   //
//   // let [popup, setPopup] = useState(false);
//   // let [evDate, setEvDate] = useState();
//   // let [evSelected, setEvSelected] = useState();
//   //
//   // const getPopup = (e, el) => {
//   //   e.preventDefault()
//   //   e.stopPropagation();
//   //   setPopup(true);
//   //   setEvDate(e.currentTarget.getAttribute('date'));
//   //   setEvSelected(e.currentTarget.getAttribute('data'));
//   // }
//   //
//   // const editData = (e, callback) => {
//   //   e.preventDefault()
//   //   const form = e.target;
//   //   sendToLocalStorage(form, callback, true);
//   // }
//   //
//   // const refreshPage = () => {
//   //   window.location.reload();
//   // }
//   //
//   // return (
//   //   <Fragment>
//   //     {popup && (
//   //       <Popup
//   //         appear={popup}
//   //         data={evSelected}
//   //         close={() => setPopup(false)}
//   //         selectedTime={new Date(evDate)}
//   //         submitInstructions={`Edit event`}
//   //         onSubmission={(e) => editData(e, () => {setPopup(false); refreshPage()})}
//   //         onDelete={(e) => deleteEv(e, () => {setPopup(false); refreshPage()})}/>
//   //     )}
//   //
//   //     {detailsArr.map((el, idx) => {
//   //       if(new Date(el.startdate).getUTCDate() === date) {
//   //         return (
//   //           <div
//   //             className="event"
//   //             key={idx}
//   //             data={JSON.stringify(el)}
//   //             date={el.startdate}
//   //             time={el.starttime}
//   //             onClick={(e) => {getPopup(e, el)}}>
//   //             {el.subject}
//   //           </div>
//   //         )
//   //       }
//   //     })}
//   //   </Fragment>
//   //
//   // )
//
//   return <div>This is event</div>
// }
