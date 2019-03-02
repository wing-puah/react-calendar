import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../calendar';

describe('Calendar', () => {

  it('renders correctly', () => {
    const results = shallow(<Calendar />);
    expect(results).to.contain('calendar');
  });
})
