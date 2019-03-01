import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const FormInput = (props) => {
  const data = props.data ? JSON.parse(props.data) : false;
  let endDate = new Date();
  let endTime = new Date();

  if (data) {
    endTime = new Date(data.enddate)
    endDate = new Date(endTime.getTime() - (endTime.getTimezoneOffset() * 60000 ))
    .toISOString()
    .split("T")[0];
  }

  return (<Fragment>
    <label htmlFor="subject" >Subject</label>
    <input type ="text" name="subject" defaultValue={data !== 'false' && data.subject}/><br/>
    <label htmlFor="startdate">Start date</label>
    <input type ="date" name="startdate" defaultValue={props.startdate} required/><br/>
    <label htmlFor="starttime">Start time</label>
    <input type ="time" name="starttime" defaultValue={data !== 'false'&& data.starttime} required/><br/>
    <label htmlFor="enddate">End date</label>
    <input type ="date" name="enddate" required defaultValue={data !== 'false' && endDate}/><br/>
    <label htmlFor="endtime">End time</label>
    <input type ="time" name="endtime" required defaultValue={data !== 'false' && data.endtime}/><br/>
    <label htmlFor="location">Location</label>
    <input type ="text" name="location" required defaultValue={data !== 'false' && data.location}/><br/>
    <label htmlFor="description" required>Description</label>
    <textarea rows="2" name="description" defaultValue={data !== 'false' && data.description}/><br/>
  </Fragment>)
};

export default FormInput
