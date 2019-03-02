import React from 'react';
import Event from './event'


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


const SingleDay = ({className, date}) => {
  className =  className === undefined ? 'calendar__col' : `calendar__col ${className}`;

  return (
    <div className={className}>
      {date}
      <Event />
    </div>
  )
};

const SingleWeek = ({children}) => (
  <div className="calendar__row">
    {children}
  </div>
);

export { SingleDay, SingleWeek };
