import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { SingleDay, SingleWeek } from './dayAndWeek';
import { getFirstWeekOfMth, createDaysOfWeek } from './helpers__firstWeek';
// import Popup from './modal';

import './styles/calendar.css';
import { timeFns, getStartOfWeek, getLastOfWeek, sendToLocalStorage } from './utils';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function Days(props) {
  const { timeStamp }  = props;
  const year = timeStamp.getUTCFullYear();
  const month = timeStamp.getUTCMonth();
  const monthInString = timeStamp.toLocaleString('en-US', {month: 'short'});
  const firstDayInString = new Date(year, month).toLocaleString('en-US', {weekday: 'short'});
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  return (
    <Fragment>
      <div className="calendar__col">
        month: {monthInString} year: {year} last date: {lastDateOfMonth} first day: {firstDayInString}
      </div>

      <div className="calendar__header">
        {days.map((el, idx) => (
          <div className="calendar__col" key={idx}>
            {el}
          </div>
        ))}
      </div>
      <div className="calendar__body">
        {renderDays(timeStamp)}
      </div>
    </Fragment>
  )
}

Days.propTypes = {
  timeStamp: PropTypes.object.isRequired,
}

function renderDays(timeStamp) {
  const currentTimeStamp = new Date(timeStamp.toUTCString());
  const currentTimeFns = timeFns(currentTimeStamp);
  const { getFirstDayOfMth, getLastDayOfMth, getLastDateOfMth, setFirstDateOfMth } = currentTimeFns;

  const lastDateOfMonth = getLastDateOfMth.getDate();
  let startDateOfWeek = getFirstDayOfMth !== 0
    ? getStartOfWeek(currentTimeStamp)
    : setFirstDateOfMth;
  let i = 0;
  let weekOfMonth = 1;
  let weeks = [];
  let daysOfWeek = [];
  weeks[0] = getFirstWeekOfMth(getFirstDayOfMth, startDateOfWeek);
  let dateInLoop = weeks[0].props.children[0][6].props.date+1; // Get Sunday of second week

  while (dateInLoop < lastDateOfMonth +1) {
    let day = React.createElement(SingleDay, {key: dateInLoop, date: dateInLoop, day: i}, null);
    daysOfWeek.push(day);

    if (i === 6) {
      weeks[weekOfMonth] = React.createElement(SingleWeek, {key: weekOfMonth+1}, [daysOfWeek]);
      i = 0;
      weekOfMonth += 1;
      daysOfWeek = [];
    } else {
      i += 1;
    }
    dateInLoop += 1;
  }

  const getNonCurrentNextMth = createDaysOfWeek(1, getLastDayOfMth, 6);
  weeks[weekOfMonth] = React.createElement(SingleWeek, {key: weekOfMonth+1}, [daysOfWeek.concat(getNonCurrentNextMth)]);
  console.log(weeks);
  return weeks;
}

export { renderDays };
export default Days;
