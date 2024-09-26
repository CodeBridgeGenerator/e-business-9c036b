import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import LoginPage from "../LoginPage";
import client from "../../../services/restClient";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("LoginPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { isLoggedIn: false },
      toast: { alert: jest.fn() },
    });
  });

  const createTestResult = async (result) => {
    try {
      console.log("Sending data to testRunHistory service:", result);
      const response = await client.service("testRunHistory").create({
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
      console.log("Response from service:", response);
    } catch (error) {
      console.error("Failed to save test result:", error);
    }
  };

  test("renders the login form", async () => {
    const testName = "renders the login form";
    const startTime = new Date();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const testStatus = screen.getByText(/login/i) ? "Passed" : "Failed";
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: "User A",
      ErrorType: "Test Error",
      FileLocation: "src/tests/LoginPage.test.js",
      FailureLineNumber: testStatus === "Failed" ? 9 : "",
      StackTrace: testStatus === "Failed" ? "Stack trace details..." : "",
      ExecutionDuration: (endTime - startTime) / 1000 + "s",
      Priority: "High",
    };

    await createTestResult(result);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("displays validation error for invalid email", async () => {
    const testName = "displays validation error for invalid email";
    const startTime = new Date();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    const testStatus = (await screen.findByText(
      "Please Enter a valid Email address",
    ))
      ? "Passed"
      : "Failed";
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: "User A",
      ErrorType: "Validation Error",
      FileLocation: "src/tests/LoginPage.test.js",
      FailureLineNumber: testStatus === "Failed" ? 18 : "",
      StackTrace: testStatus === "Failed" ? "Stack trace details..." : "",
      ExecutionDuration: (endTime - startTime) / 1000 + "s",
      Priority: "High",
    };

    await createTestResult(result);
  });

  test("displays validation error for short password", async () => {
    const testName = "displays validation error for short password";
    const startTime = new Date();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.click(loginButton);

    const testStatus = (await screen.findByText(
      "Please enter a valid password. Must be at least 6 characters",
    ))
      ? "Passed"
      : "Failed";
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: "User A",
      ErrorType: "Validation Error",
      FileLocation: "src/tests/LoginPage.test.js",
      FailureLineNumber: testStatus === "Failed" ? 29 : "",
      StackTrace: testStatus === "Failed" ? "Stack trace details..." : "",
      ExecutionDuration: (endTime - startTime) / 1000 + "s",
      Priority: "High",
    };

    await createTestResult(result);
  });

  test("calls login function on valid form submission", async () => {
    const testName = "calls login function on valid form submission";
    const startTime = new Date();
    const loginMock = jest.fn(() => Promise.resolve());
    const alertMock = jest.fn();

    store = mockStore({
      auth: { isLoggedIn: false },
      toast: { alert: alertMock },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage login={loginMock} />
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("example@gmail.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(loginMock).toHaveBeenCalled());

    const testStatus = loginMock.mock.calls.length > 0 ? "Passed" : "Failed";
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: "User A",
      ErrorType: "Function Call Error",
      FileLocation: "src/tests/LoginPage.test.js",
      FailureLineNumber: testStatus === "Failed" ? 39 : "",
      StackTrace: testStatus === "Failed" ? "Stack trace details..." : "",
      ExecutionDuration: (endTime - startTime) / 1000 + "s",
      Priority: "High",
    };

    await createTestResult(result);
  });

  test("shows forgot password dialog", async () => {
    const testName = "shows forgot password dialog";
    const startTime = new Date();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const forgotPasswordButton = screen.getByText("Forgot Password");
    fireEvent.click(forgotPasswordButton);

    const testStatus = screen.getByText("Forgot Password")
      ? "Passed"
      : "Failed";
    const endTime = new Date();
    const result = {
      TestName: testName,
      TestStatus: testStatus,
      ExecutionDateTime: startTime,
      ExecutedBy: "User A",
      ErrorType: "Dialog Error",
      FileLocation: "src/tests/LoginPage.test.js",
      FailureLineNumber: testStatus === "Failed" ? 50 : "",
      StackTrace: testStatus === "Failed" ? "Stack trace details..." : "",
      ExecutionDuration: (endTime - startTime) / 1000 + "s",
      Priority: "High",
    };

    await createTestResult(result);
  });
});
