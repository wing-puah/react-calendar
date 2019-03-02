import React, { useState } from 'react';
import Event from './event';
// import Popup from './modal';
import withPopup from './withPopup';

function getAllQuery() {
  let allQuery = [];

  for (let i=0; i < localStorage.length; i++) {
    const getKey = localStorage.key(i)
    allQuery.push(localStorage.getItem(getKey));
  }

  return allQuery;
}

function getThisMonthEv(month) {
  const events = [];
  const dates = [];

  getAllQuery().forEach((el, idx) => {
    const getMonth = new Date(JSON.parse(el).startdate).getUTCMonth();

    if (getMonth === month) {
      const getDate = new Date(JSON.parse(el).startdate).getUTCDate();
      events.push(el);
      dates.push(getDate);
    }
  });

  return {events, dates};
}

const SingleDayWithoutPopup = ({className, date, togglePopup}) => {
  let [popup, setPopup] = useState(false);
  let [evDate, setEvDate] = useState();
  let [evSelected, setEvSelected] = useState();
  className =  className === undefined ? 'calendar__col' : `calendar__col ${className}`;

  // function showPopup(e) {
  //   e.preventDefault();
  //   console.log('in event', e.target);
  //   setPopup(true)
  // }

  return (
    <div className={className}>
      <div
        onClick={togglePopup}
        >{date}</div>
      <Event />
    </div>
  )
};

const SingleWeek = ({children}) => (
  <div className="calendar__row">
    {children}
  </div>
);

const SingleDay= withPopup(SingleDayWithoutPopup);
export { SingleDay, SingleWeek };
