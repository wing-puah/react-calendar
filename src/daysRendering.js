import React from 'react';
import PropTypes from 'prop-types';
import { timeFns, getStartOfWeek } from './utils';
import { SingleDay,  SingleWeek } from './dayAndWeek';
import { getFirstWeekOfMth, createDaysOfWeek } from './helpers__firstWeek';

function CalendarDays(props) {
  const { timeStamp, accessEvents } = props
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
    let day = React.createElement(SingleDay,
      {key: dateInLoop, date: dateInLoop, day: i},
      null);
    daysOfWeek.push(day);

    if (i === 6) {
      weeks[weekOfMonth] = React.createElement(SingleWeek,
        {key: weekOfMonth+1, onClick: accessEvents}, [daysOfWeek]);
      i = 0;
      weekOfMonth += 1;
      daysOfWeek = [];
    } else {
      i += 1;
    }
    dateInLoop += 1;
  }

  const getNonCurrentNextMth = createDaysOfWeek(1, getLastDayOfMth, 6);
  weeks[weekOfMonth] = React.createElement(SingleWeek, {key: weekOfMonth+1, onClick: ()=>accessEvents}, [daysOfWeek.concat(getNonCurrentNextMth)]);
  return weeks;
}

CalendarDays.propTypes = {
  timeStamp: PropTypes.object.isRequired,
  accessEvents: PropTypes.func,
}

export default CalendarDays;
