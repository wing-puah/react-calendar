import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { timeFns } from './utils';

const FormInput = (props) => {
  const { timeStamp } = props;
  const data = props.data ? JSON.parse(props.data) : false;

  let timeStampForInput = typeof timeStamp === 'undefined' ?
    new Date() : timeStamp;
  const defaultSubject = data.subject || 'Event'
  const defaultStartDate = timeFns(timeStampForInput).parseForDateInput || data.startdate;
  const defaultStartTime = timeFns(timeStampForInput).parseForTimeInput || data.starttime;

  return (
    <Fragment>
      <label htmlFor="subject" >Subject</label>
      <input type ="text" name="subject" defaultValue={defaultSubject} required/><br/>
      <label htmlFor="startdate">Start date</label>
      <input type ="date" name="startdate" defaultValue={defaultStartDate} required/><br/>
      <label htmlFor="starttime">Start time</label>
      <input type ="time" name="starttime" defaultValue={defaultStartTime} required/><br/>
    </Fragment>)
};

FormInput.propTypes = {
  timeStamp: PropTypes.object.isRequired,
  data: PropTypes.object,
}

export default FormInput
