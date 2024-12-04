import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

jest.mock('./presentation/navigation/StackNavigator', () => ({
  StackNavigator: () => <></>,
}));

describe('App Component', () => {
  test('renders correctly', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
