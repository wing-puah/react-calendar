import React from 'react';
import { SingleDay, SingleWeek } from './dayAndWeek';

// function createMultipleDays(startDate, dayToStop, reverse) {
//   arguments.length < 3 ? reverse = false || reverse;
//
//   if (reverse == true)  {
//
//   }
//   while()
// }

function getPastMonthDates(pastMthStartDate, firstDayOfCurrentMth) {
  let pastMonthDateToAddFrom = pastMthStartDate.getUTCDate();
  let pastMonthDay = 0;
  let allDatesOfPastMonth = [];

  while(pastMonthDay !== firstDayOfCurrentMth) {
    let pastMonthDate = React.createElement(SingleDay,
      {key: `past-${pastMonthDay}`, date: pastMonthDateToAddFrom, className: "calendar__past calendar--disabled"}, null);
    allDatesOfPastMonth.push(pastMonthDate);

    pastMonthDateToAddFrom += 1;
    pastMonthDay += 1;
  }
  return allDatesOfPastMonth;
}

function getDatesOfFirstWeekOfCurrentMth(el) {
  let firstWeekDate = 1;
  let firstWeekDay = el;
  let allDatesOfFirstWeek = [];

  while (firstWeekDay !== 7) {
      let currentDate = React.createElement(SingleDay, {key: firstWeekDay, date: firstWeekDate}, null);
      allDatesOfFirstWeek.push(currentDate);

      firstWeekDate += 1;
      firstWeekDay += 1;
  }
  return allDatesOfFirstWeek;
}

function createDaysOfWeek(dateToStartLoop, dayToStartLoop, dayToEndLoop) {
  let allDates = [];

  while (dayToStartLoop !== dayToEndLoop) {
    let date = React.createElement(SingleDay, {key: `next-${dayToStartLoop}`, date: dateToStartLoop, className: "calendar__next calendar--disabled"}, null);
    allDates.push(date);

    dateToStartLoop += 1;
    dayToStartLoop += 1;
  }
  return allDates;
}

function getFirstWeekOfMth(firstDayOfCurrentMth, firstDateOfWeek) {
  let week;
  const FirstWeekCurrentMonth = getDatesOfFirstWeekOfCurrentMth(firstDayOfCurrentMth);

  if (firstDayOfCurrentMth !== 0)  {
    const PastMonthDates = getPastMonthDates(firstDateOfWeek, firstDayOfCurrentMth);
    week = React.createElement(SingleWeek, {key: 1}, [PastMonthDates.concat(FirstWeekCurrentMonth)]);
  } else {
    week = React.createElement(SingleWeek, {key: 1}, [FirstWeekCurrentMonth]);
  }

  return week;
}

export { getFirstWeekOfMth, createDaysOfWeek };
