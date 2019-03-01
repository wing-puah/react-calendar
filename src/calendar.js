import React, { Component, Fragment } from 'react';
import Days from './days';
import Timer from './time';
import { CSVLink } from "react-csv";

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

class Calendar extends Component {
  state = {
      calendarTimeStamp: new Date(),
      currentMonthIdx: 0,
  }

  componentDidMount() {
    this.setState((state) => ({
      currentMonthIdx: state.calendarTimeStamp.getUTCMonth()
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.calendarTimeStamp !== prevState.calendarTimeStamp) {
      this.setState((state) => ({
        currentMonthIdx: state.calendarTimeStamp.getUTCMonth()
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
    const calendarMth = this.state.calendarTimeStamp.toLocaleString('en-US', {month: 'short'});
    const calendarYear = this.state.calendarTimeStamp.getUTCFullYear();
    const csvData = prepareCSV();

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default Calendar;
