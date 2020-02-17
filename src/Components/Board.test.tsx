import React from 'react';
import { render } from '@testing-library/react';
import Board from './Board';

test('renders tic tac toe board', () => {
  const { getByText } = render(<Board onSquareClick={() => } squares={[]} />);
  const button = getByText(/foo/i);
  expect(button).toBeInTheDocument();
});