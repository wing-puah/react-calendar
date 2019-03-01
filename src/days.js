import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Popup from './modal';
import Event from './event'
import './calendar.css';
import { timeFns, getStartOfWeek, getLastOfWeek, sendToLocalStorage } from './utils';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

class Days extends React.Component {
  state = {
    popup: false,
    selectedDate: false,
    datesWithEvents: [],
    eventDetails: [],
  }

  renderCells(first, last, timeStamp) {
    let date = 1;
    let week = [];
    let month = [];
    let i = first;
    let startDate = getStartOfWeek(timeStamp).getDate().toString();
    let endDate = getLastOfWeek(timeStamp).getUTCDate().toString();
    let endDateInt = parseInt(endDate);

    while (date < last+1) {
      for (first; first > 0; first--) {
        week.push(startDate);
        startDate++;
      }
      if ( i !== 7 ) {
        week.push(date);
        i += 1;
        date += 1;
      } else {
        month.push([week]);
        week = [];
        i = 0;
      }
    }

    if (getLastOfWeek(timeStamp).getUTCMonth() !== timeStamp.getUTCMonth())  {
      week.push(...Array(endDateInt).fill().map((v,i)=>i+1));
    }

    month.push([week])
    return month;
  };

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
    const firstDayOfMonth = new Date(year, month).getDay();
    const firstDayInString = new Date(year, month).toLocaleString('en-US', {weekday: 'short'});
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    return (
      <Fragment>
        {(this.state.popup && this.state.selectedDate) &&
          <Popup
            close={this.closePopup}
            appear={this.state.popup}
            submitInstructions={`Add event`}
            selectedTime={new Date(this.state.selectedDate)}
            onSubmission={(e) => this.saveData(e, this.refreshPage )}/>
        }
        <div className="calendar__header">
          {days.map((el, idx) => (
            <div className="calendar__col" key={idx}>
              {el}
            </div>
          ))}
        </div>
        <div className="calendar__body">
          {this.renderCells(firstDayOfMonth, lastDateOfMonth, timeStamp).map((el, idx) => (
            <div className="calendar__row" key={idx}>
              {el[0].map((date,idx) => (
                  <div
                    key={idx}
                    className="calendar__col"
                    value={date}
                    >
                    <div
                      onClick={() => this.popUp(date)}
                      style={{textDecoration: 'underline'}}
                      >{date}</div>

                    {this.state.datesWithEvents.indexOf(date) > -1 &&
                      <Event
                        details={this.state.eventDetails}
                        date={date}
                        timeStamp={timeStamp}/>
                    }
                  </div>
                )
              )}
            </div>)
          )}
        </div>
        <div className="calendar__row">
          <div className="calendar__col">
            month: {monthInString} year: {year} last date: {lastDateOfMonth} first day: {firstDayInString}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Days;
