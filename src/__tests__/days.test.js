import React from 'react';
import renderer from 'react-test-renderer';
import Days, { renderDays } from '../days';
import { timeFns, getStartOfWeek, getLastOfWeek } from '../utils';

describe('Days', () => {
  const timeStamp = new Date(2019, 3, 13, 14, 4, 15);
  const DaysComponent = renderer
    .create(<Days timeStamp={timeStamp}/>)
    .toJSON();

  const DaysRenderFn = renderDays(timeStamp);
  const { getLastDateOfMth, getFirstDayOfMth, getLastDayOfMth } = timeFns(timeStamp);
  const lastDateInt = getLastDateOfMth.getDate();
  const noOfDaysOnCalendar = lastDateInt + getFirstDayOfMth + (6-getLastDayOfMth);

  it('renders correctly', () => {
    expect(DaysComponent).toMatchSnapshot();
  });

  it('renders all the dates in the month', () => {
    expect(DaysRenderFn.length).toBe(Math.ceil(lastDateInt/7))
  });
})
