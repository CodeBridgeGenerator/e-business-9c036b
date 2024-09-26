import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SignUpPage from '../SignUpPage'; 
import client from '../../../../services/restClient';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SignUpPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { isLoggedIn: false },
      toast: { alert: jest.fn() },
    });
  });

  const createTestResult = async (result) => {
    try {
      console.log('Sending data to testRunHistory service:', result);
      const response = await client.service('testRunHistory').create({
        TestName: result.TestName,
        TestStatus: result.TestStatus,
        ExecutionDateTime: result.ExecutionDateTime,
        ExecutedBy: result.ExecutedBy,
        ErrorType: result.ErrorType,
        FileLocation: result.FileLocation,
        FailureLineNumber: result.FailureLineNumber,
        StackTrace: result.StackTrace,
        ExecutionDuration: result.ExecutionDuration,
        Priority: result.Priority,
      });
      console.log('Response from service:', response);
    } catch (error) {
      console.error('Failed to save test result:', error);
    }
  };

  test('renders the sign-up form', async () => {
    const testName = 'renders the sign-up form';
    const startTime = new Date();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    const testStatus = screen.getByText(/sign up/i) ? 'Passed' : 'Failed';
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: 'User A',
      ErrorType: 'Render Error',
      FileLocation: 'src/tests/SignUpPage.test.js',
      FailureLineNumber: testStatus === 'Failed' ? 9 : '',
      StackTrace: testStatus === 'Failed' ? 'Stack trace details...' : '',
      ExecutionDuration: (endTime - startTime) / 1000 + 's',
      Priority: 'High',
    };

    await createTestResult(result);

    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('displays validation error for invalid email', async () => {
    const testName = 'displays validation error for invalid email';
    const startTime = new Date();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpButton);

    const testStatus = (await screen.findByText('Please enter a valid email address'))
      ? 'Passed'
      : 'Failed';
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: 'User A',
      ErrorType: 'Validation Error',
      FileLocation: 'src/tests/SignUpPage.test.js',
      FailureLineNumber: testStatus === 'Failed' ? 18 : '',
      StackTrace: testStatus === 'Failed' ? 'Stack trace details...' : '',
      ExecutionDuration: (endTime - startTime) / 1000 + 's',
      Priority: 'High',
    };

    await createTestResult(result);

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('displays validation error for short password', async () => {
    const testName = 'displays validation error for short password';
    const startTime = new Date();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(signUpButton);

    const testStatus = (await screen.findByText('Password must be at least 6 characters long'))
      ? 'Passed'
      : 'Failed';
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: 'User A',
      ErrorType: 'Validation Error',
      FileLocation: 'src/tests/SignUpPage.test.js',
      FailureLineNumber: testStatus === 'Failed' ? 29 : '',
      StackTrace: testStatus === 'Failed' ? 'Stack trace details...' : '',
      ExecutionDuration: (endTime - startTime) / 1000 + 's',
      Priority: 'High',
    };

    await createTestResult(result);

    expect(await screen.findByText('Password must be at least 6 characters long')).toBeInTheDocument();
  });

  test('calls signup function on valid form submission', async () => {
    const testName = 'calls signup function on valid form submission';
    const startTime = new Date();
    const signupMock = jest.fn(() => Promise.resolve());
    const alertMock = jest.fn();

    store = mockStore({
      auth: { isLoggedIn: false },
      toast: { alert: alertMock },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage signup={signupMock} />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpButton);

    await waitFor(() => expect(signupMock).toHaveBeenCalled());

    const testStatus = signupMock.mock.calls.length > 0 ? 'Passed' : 'Failed';
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: 'User A',
      ErrorType: 'Function Call Error',
      FileLocation: 'src/tests/SignUpPage.test.js',
      FailureLineNumber: testStatus === 'Failed' ? 39 : '',
      StackTrace: testStatus === 'Failed' ? 'Stack trace details...' : '',
      ExecutionDuration: (endTime - startTime) / 1000 + 's',
      Priority: 'High',
    };

    await createTestResult(result);
  });

  test('shows step 2 on correct code verification', async () => {
    const testName = 'shows step 2 on correct code verification';
    const startTime = new Date();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const codeInput = screen.getByPlaceholderText('Enter verification code');
    const nextButton = screen.getByText('Next');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(nextButton);

    const testStatus = screen.getByText(/Step 2/i) ? 'Passed' : 'Failed';
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: 'User A',
      ErrorType: 'Verification Error',
      FileLocation: 'src/tests/SignUpPage.test.js',
      FailureLineNumber: testStatus === 'Failed' ? 50 : '',
      StackTrace: testStatus === 'Failed' ? 'Stack trace details...' : '',
      ExecutionDuration: (endTime - startTime) / 1000 + 's',
      Priority: 'High',
    };

    await createTestResult(result);

    expect(screen.getByText(/Step 2/i)).toBeInTheDocument();
  });
});
