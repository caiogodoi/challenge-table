import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import CreateAccountScreen from "../index";

jest.mock("@/utils", () => ({
  cpfMask: jest.fn((cpf) => cpf),
}));

jest.mock("@/components/Modal", () => jest.fn(() => null));
jest.mock("@/components/BiometryModal", () => jest.fn(() => null));
jest.mock("../create-account.hooks", () => () => ({
  loading: false,
  modalVisible: false,
  biometryModalVisible: false,
  isFormValid: false,
  errors: {
    firstAndLastName: "",
    cpf: "",
    password: "",
  },
  firstAndLastName: "",
  cpf: "",
  password: "",
  handleValidation: jest.fn(),
  handleSubmit: jest.fn(),
  handleBiometryModal: jest.fn(),
  setFirstAndLastName: jest.fn(),
  setCpf: jest.fn(),
  setPassword: jest.fn(),
  setModalVisible: jest.fn(),
  setBiometryModalVisible: jest.fn(),
}));

describe("CreateAccountScreen", () => {
  it("renders the create account screen correctly", () => {
    render(<CreateAccountScreen />);

    expect(screen.getByPlaceholderText("First and Last Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("CPF")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByText("Confirm")).toBeTruthy();
  });
});
