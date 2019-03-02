import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

import { SingleDay, SingleWeek } from './dayAndWeek';
import { getFirstWeekOfMth, createDaysOfWeek } from './helpers__firstWeek';
// import Popup from './modal';
// import Event from './event'
import './styles/calendar.css';
import { timeFns, getStartOfWeek, getLastOfWeek, sendToLocalStorage } from './utils';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class Days extends React.Component {
  state = {
    popup: false,
    selectedDate: false,
    datesWithEvents: [],
    eventDetails: [],
  }

  renderDays() {
    console.log(this.props.timeStamp)
    const currentTimeStamp = new Date(this.props.timeStamp.toUTCString());
    console.log(currentTimeStamp)
    const currentTimeFns = timeFns(currentTimeStamp);
    const firstDayOfMonth = currentTimeFns.getFirstDayOfMth;
    const lastDayOfMth = currentTimeFns.getLastDayOfMth;
    const lastDateOfMonth = currentTimeFns.getLastDateOfMth.getDate();
    let startDateOfWeek = firstDayOfMonth !== 0
      ? getStartOfWeek(currentTimeStamp)
      : currentTimeFns.setFirstDateOfMth;
    let i = 0;
    let weekOfMonth = 1;
    let weeks = [];
    let daysOfWeek = [];

    weeks[0] = getFirstWeekOfMth(firstDayOfMonth, startDateOfWeek);
    let dateInLoop = weeks[0].props.children[0][6].props.date+1; // Get Sunday of second week

    while (dateInLoop < lastDateOfMonth +1) {
      let day = React.createElement(SingleDay, {key: dateInLoop, date: dateInLoop, day: i}, null);
      daysOfWeek.push(day);
    //
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

    const getNonCurrentNextMth = createDaysOfWeek(1, lastDayOfMth, 6);
    weeks[weekOfMonth+1] = React.createElement(SingleWeek, {key: weekOfMonth+1}, [daysOfWeek.concat(getNonCurrentNextMth)]);
    return weeks;
  }

  popUp(e) {
    const targetDate = new Date(this.props.timeStamp.setDate(e));
    this.setState((state, props) => ({
        popup: true,
        selectedDate: targetDate,
    }));
  }

  closePopup = () => {
    this.setState({popup: false});
  }

  refreshPage = () => {
    window.location.reload();
  }

  saveData = (e, callback) => {
    e.preventDefault();
    const form = e.target;
    sendToLocalStorage(form, () => {this.setState({popup: false})})
    if(callback) {
      callback();
    }
  }

  componentDidMount() {
    const ev = getThisMonthEv(this.props.timeStamp.getUTCMonth());
    const events = ev.events;
    const withEvents = ev.dates;

    this.setState({
      eventDetails: events,
      datesWithEvents: withEvents
    });
  }


  componentDidUpdate(prevProps, prevState) {
    if(this.props.timeStamp !== prevProps.timeStamp) {
      const ev = getThisMonthEv(this.props.timeStamp.getUTCMonth());
      const events = ev.events;
      const withEvents = ev.dates;

      this.setState({
        eventDetails: events,
        datesWithEvents: withEvents
      });
    }
  }



  render () {
    const { timeStamp }  = this.props;
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
          {this.renderDays()}
        </div>
      </Fragment>
    )
  }
}

// {this.renderCells(firstDayOfMonth, lastDateOfMonth, timeStamp).map((el, idx) => (
//   <div className="calendar__row" key={idx}>
//     {el[0].map((date,idx) => (
//         <div
//           key={idx}
//           className="calendar__col"
//           value={date}
//           >
//           <div
//             onClick={() => this.popUp(date)}
//             style={{textDecoration: 'underline'}}
//             >{date}</div>
//         </div>
//       ))}
//     </div>
// ))}
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


// {(this.state.popup && this.state.selectedDate) &&
//   <Popup
//     close={this.closePopup}
//     appear={this.state.popup}
//     submitInstructions={`Add event`}
//     selectedTime={new Date(this.state.selectedDate)}
//     onSubmission={(e) => this.saveData(e, this.refreshPage )}/>
// }

// {this.state.datesWithEvents.indexOf(date) > -1 &&
//   <Event
//     details={this.state.eventDetails}
//     date={date}
//     timeStamp={timeStamp}/>
// }
// </div>
// )
// )}

export default Days;
