import React from 'react';
import Event from './event';
import { EventConsumer } from './eventContext';


const SingleDay = ({className, date}) => {
  let newClassName =  className === undefined ? 'calendar__col' : `calendar__col ${className}`;

  return (
    <EventConsumer>
      { context => {

        function getData(eventdate) {
          let eventDetail = [];
          let parseData = JSON.parse(JSON.stringify(context.eventData));

          parseData.map((el, idx) => {
            const singleData = JSON.parse(el);
            const dateOfData = new Date(singleData.startdate).getDate();

            if (dateOfData === eventdate) {
              eventDetail.push(singleData);
            }
          })
          return eventDetail;
        }

        return (
          <div className={newClassName}>
            <div>{date}</div>

            {context.datesWithEvents.indexOf(date) > -1 && newClassName.indexOf('calendar__past') === -1
              && newClassName.indexOf('calendar__next') === -1  &&
              <Event data={getData(date)} date={date} />
            }
          </div>
        )}
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
