import React from 'react';
import renderer from 'react-test-renderer';
import Calendar from '../calendar'; 

describe('Calendar', () => {
  it('renders correctly', () => {
    const calendar = renderer
      .create(<Calendar />)
      .toJSON();
    expect(calendar).toMatchSnapshot();
  });
})
