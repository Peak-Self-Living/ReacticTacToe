import React from 'react';
import { render } from '@testing-library/react';
import Sqaure from './Square';

test('renders Square', () => {
  const { getByText } = render(<Sqaure value="X" />);
  const button = getByText(/foo/i);
  expect(button).toBeInTheDocument();
});