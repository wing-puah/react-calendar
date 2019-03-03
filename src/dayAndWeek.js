import React from 'react';
import Event from './event';
import { EventConsumer } from './eventContext';

const SingleDay = ({className, date}) => {
  className =  className === undefined ? 'calendar__col' : `calendar__col ${className}`;

  return (
    <EventConsumer>
      { context => (
          <div className={className}>
            <div
              data={context.data}
              >{date}</div>

            {context.datesWithEvents.indexOf(date) > -1 &&
              <Event data={context.eventData} date={date}/>
            }
          </div>
        )
      }
    </EventConsumer>
  )
};

const SingleWeek = ({children}) => (
  <div className="calendar__row">
    {children}
  </div>
);

export { SingleWeek, SingleDay};
