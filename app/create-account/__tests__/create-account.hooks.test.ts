import { renderHook, act } from "@testing-library/react-hooks";
import useCreateAccount from "../create-account.hooks";
import { render } from "@testing-library/react-native";

jest.mock("@/utils", () => ({
  getFromStorage: jest.fn(() => Promise.resolve({ cpf: "12345678900" })),
  setToStorage: jest.fn(() => Promise.resolve()),
  validateCPF: jest.fn((cpf) => cpf.length === 11),
}));

describe("useCreateAccount", () => {
  it("initializes with default state", () => {
    const { result } = renderHook(() => useCreateAccount());

    expect(result.current.firstAndLastName).toBe("");
    expect(result.current.cpf).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.loading).toBe(false);
    expect(result.current.errors).toEqual({
      firstAndLastName: "",
      cpf: "",
      password: "",
    });
  });

  it("validates inputs correctly", () => {
    const { result } = renderHook(() => useCreateAccount());

    act(() => {
      result.current.handleValidation("firstAndLastName", "John");
    });

    expect(result.current.errors.firstAndLastName).toBe(
      "Please enter your full name."
    );

    act(() => {
      result.current.handleValidation("cpf", "12345678900");
    });

    expect(result.current.errors.cpf).toBe("");

    act(() => {
      result.current.handleValidation("password", "123456");
    });

    expect(result.current.errors.password).toBe("");
  });

  it("handles submission with valid data", async () => {
    const { result } = renderHook(() => useCreateAccount());

    act(() => {
      result.current.setFirstAndLastName("John Doe");
      result.current.setCpf("12345678900");
      result.current.setPassword("password123");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.biometryModalVisible).toBe(true);
  });

  it("handles biometry modal acceptance", async () => {
    const { result } = renderHook(() => useCreateAccount());

    await act(async () => {
      await result.current.handleBiometryModal(true);
    });

    expect(result.current.loading).toBe(true);
  });
});
