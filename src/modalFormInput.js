import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { timeFns } from './utils';

class FormInput extends Component{
  state = {
    startdate: '',
    starttime: '',
    enddate: '',
    endtime: '',
    minEndTime: '',
  }

  componentDidMount() {
    const { data, timeStamp } = this.props;
    const initialStartDate = data ? data.startdate : timeFns(new Date(timeStamp)).parseForDateInput
    const initialStartTime = data ? data.starttime : timeFns(new Date(timeStamp)).parseForTimeInput
    const initialEndDate = data ? data.enddate : timeFns(new Date(timeStamp)).parseForDateInput;
    const initialEndTime = data ? data.endtime : timeFns(new Date(timeStamp)).parseForTimeInput;
    const initialMinEndTime = initialStartDate === initialEndDate ? initialStartTime : null;

    this.setState({
      startdate: initialStartDate,
      starttime: initialStartTime,
      enddate: initialEndDate,
      endtime: initialEndTime,
      minEndTime: initialMinEndTime,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.enddate !== prevState.enddate || this.state.startdate !== prevState.startdate) {
      const minEndTime = this.state.startdate === this.state.enddate ? this.state.starttime : null;
      this.setState({minEndTime: minEndTime})
    }
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  render() {
    const data = this.props.data ? this.props.data : false;
    const defaultSubject = data.subject || 'Event';

    console.log('min', this.state.minEndTime)
    return (
      <Fragment>
        <label htmlFor="subject" >Subject</label>
        <input type ="text" name="subject" defaultValue={defaultSubject} required/><br/>

        <label htmlFor="startdate">Start date</label>
        <input
          type ="date" name="startdate" value={this.state.startdate}
          onChange={(e) => this.handleChange(e)} required /><br/>

        <label htmlFor="starttime">Start time</label>
        <input type ="time" name="starttime" value={this.state.starttime}
          onChange={(e) => this.handleChange(e)} required /><br/>

        <label htmlFor="enddate">End date</label>
        <input type ="date" name="enddate" value={this.state.enddate}
          onChange={(e) => this.handleChange(e)} min={this.state.startdate} required /><br/>

        <label htmlFor="endtime">End time</label>
        <input type ="time" name="endtime" value={this.state.endtime}
          onChange={(e) => this.handleChange(e)} required min={this.state.minEndTime}/><br/>

        <label htmlFor="location">Location</label>
        <input type ="text" name="location" required defaultValue={data !== 'false' && data.location}/><br/>
        <label htmlFor="description" required>Description</label>
        <textarea rows="2" name="description" defaultValue={data !== 'false' && data.description}/><br/>
    </Fragment>)
  }
}

FormInput.propTypes = {
  timeStamp: PropTypes.object.isRequired,
  data: PropTypes.object,
}

export default FormInput
