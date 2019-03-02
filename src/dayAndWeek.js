import React from 'react';

const SingleDay = ({className, date}) => (
  <div className={`calendar__col ${className}`}>
    {date}
  </div>
);

const SingleWeek = ({children}) => (
  <div className="calendar__row">
    {children}
  </div>
);

export { SingleDay, SingleWeek }; 
