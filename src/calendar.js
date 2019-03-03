import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import { timeFns } from './utils';
import Days from './days';
import Timer from './time';
import { EventProvider } from './eventContext';

const Context = React.createContext({});

class Calendar extends Component {
  state = {
      calendarTimeStamp: new Date(),
      currentMonthIdx: Number,
      allEvents: [],
      datesWithEvents: [],
  }

  componentDidMount() {
    const currMthEventsAndDates = getAllQuery(timeFns(this.state.calendarTimeStamp).month);

    this.setState((state) => ({
      currentMonthIdx: state.calendarTimeStamp.getUTCMonth(),
      allEvents: currMthEventsAndDates.filteredQuery,
      datesWithEvents: currMthEventsAndDates.datesWithEvents,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.calendarTimeStamp !== prevState.calendarTimeStamp) {
      const currMthEventsAndDates = getAllQuery(timeFns(this.state.calendarTimeStamp).month);

      this.setState((state) => ({
        currentMonthIdx: state.calendarTimeStamp.getUTCMonth(),
        allEvents: currMthEventsAndDates.filteredQuery,
        datesWithEvents: currMthEventsAndDates.datesWithEvents,
      }));
    }
  }

  incrementMonth = () => {
    this.setState((state) => { return {
      calendarTimeStamp: new Date(state.calendarTimeStamp.setMonth(state.currentMonthIdx + 1))}
    })
  }

  decrementMonth = () => {
    this.setState((state) => { return {
      calendarTimeStamp: new Date(state.calendarTimeStamp.setMonth(state.currentMonthIdx - 1))}
    })
  }

  render() {
    const currentTimeFn = timeFns(this.state.calendarTimeStamp);
    const calendarMth = currentTimeFn.shortMth;
    const calendarYear = currentTimeFn.year;
    const csvData = prepareCSV();
    const contextValue = {
      eventData: this.state.allEvents,
      datesWithEvents: this.state.datesWithEvents,
    }

    return (
      <EventProvider value={contextValue}>
        <Timer />
        <div className="calendar">
          <CSVLink data={csvData}>Export all events</CSVLink>
          <div className="calendar__nav">
            <button
              className="prev"
              value="prev"
              onClick={this.decrementMonth}>
              &lt;
            </button>
            <h2>{ calendarMth } { calendarYear }</h2>
            <button
              className="next"
              value="next"
              onClick={this.incrementMonth}>
              &gt;
            </button>
          </div>
          <Days
            timeStamp={this.state.calendarTimeStamp} />
        </div>
      </EventProvider>
    );
  }
}

function prepareCSV() {
  let csvData = ["subject", "startdate", "starttime", "enddate", "endtime", "location", "description"];
  let csvToSend = [csvData];

  Object.keys(localStorage).forEach(function(key, idx){
    let rows = localStorage.getItem(key);
    const parseRows = JSON.parse(rows);
    const { subject, startdate, starttime, enddate, endtime, location, description } = parseRows;
    const csvRow = [subject, startdate, starttime, enddate, endtime, location, description];
    csvToSend[idx+1] = csvRow;
  });
  return csvToSend;
}

function getAllQuery(month) {
  let allQuery = [];
  let datesWithEvents = [];
  let filteredQuery;

  for (let i=0; i < localStorage.length; i++) {
    const getKey = localStorage.key(i)
    allQuery.push(localStorage.getItem(getKey));
  }

  if (arguments.length === 1) {
    filteredQuery = allQuery.filter((el, idx) => {
      const parseStartDate = JSON.parse(el).startdate;
      if (new Date(parseStartDate).getUTCMonth() === month) {
        datesWithEvents.push(new Date(parseStartDate).getUTCDate())
      }
      return new Date(parseStartDate).getUTCMonth() === month;
    })
  };

  return { filteredQuery, datesWithEvents };
}


export default Calendar;
