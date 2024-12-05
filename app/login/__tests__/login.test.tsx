import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import LoginScreen from "../index";
import useLogin from "../login.hooks";
import { router } from "expo-router";

jest.mock("../login.hooks", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/components/Modal", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return ({ visibility, modalMassage }: any) =>
    visibility ? <Text>{modalMassage}</Text> : null;
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

describe("LoginScreen", () => {
  let mockUseLogin: any;

  beforeEach(() => {
    mockUseLogin = {
      usernameScale: { current: { interpolate: jest.fn() } },
      cpf: "",
      password: "",
      loading: false,
      modalVisible: false,
      passwordScale: { current: { interpolate: jest.fn() } },
      setCpf: jest.fn(),
      setPassword: jest.fn(),
      handleSubmit: jest.fn(),
      setModalVisible: jest.fn(),
      handleFocus: jest.fn(),
      handleBlur: jest.fn(),
    };

    (useLogin as jest.Mock).mockReturnValue(mockUseLogin);
  });

  it("renders login screen correctly", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    expect(getByText("Login")).toBeTruthy();
    expect(getByPlaceholderText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  it("updates CPF field on input", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const usernameInput = getByPlaceholderText("Username");

    fireEvent.changeText(usernameInput, "123.456.789-00");

    expect(mockUseLogin.setCpf).toHaveBeenCalledWith("123.456.789-00");
  });

  it("updates Password field on input", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(passwordInput, "password123");

    expect(mockUseLogin.setPassword).toHaveBeenCalledWith("password123");
  });

  it("calls handleSubmit when submit button is pressed", () => {
    const { getByText } = render(<LoginScreen />);
    const submitButton = getByText("Submit");

    fireEvent.press(submitButton);

    expect(mockUseLogin.handleSubmit).toHaveBeenCalled();
  });

  it("displays a modal with error message when modalVisible is true", () => {
    mockUseLogin.modalVisible = true;

    const { getByText } = render(<LoginScreen />);

    expect(getByText("Invalid username or password.")).toBeTruthy();
  });
});
