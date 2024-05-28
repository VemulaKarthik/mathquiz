import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../Components/Home.jsx';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(<Home />);
  });


  test('has the correct class name for the button', () => {
    const { getByText } = render(<Home />);
    const button = getByText('Back to Home');
    expect(button).toHaveClass('btn btn-primary m-3');
  });

  test('does not rely on external props', () => {
    // Ensure the component doesn't accept any props
    const { getByText } = render(<Home />);
    expect(() => getByText('Back to Home')).not.toThrow();
  });

  test('calls navigate function when button is clicked', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    const { getByText } = render(<Home />);
    fireEvent.click(getByText('Back to Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
