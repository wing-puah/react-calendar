import React from 'react';
import renderer from 'react-test-renderer';
import Days from '../days';

describe('Days', () => {
  it('renders correctly', () => {
    const days = renderer
      .create(<Days />)
      .toJSON();
    expect(days).toMatchSnapshot();
  });
})
