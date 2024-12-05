import { renderHook, act } from "@testing-library/react-hooks";
import useLogin from "../login.hooks";
import { getFromStorage, setToStorage } from "@/utils";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("@/utils", () => ({
  getFromStorage: jest.fn(),
  setToStorage: jest.fn(),
  generateToken: jest.fn(() => "mock-token"),
}));

jest.mock("@/hooks/UseBiometry", () => jest.fn());

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

describe("useLogin", () => {
  it("initializes with correct default values", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.cpf).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.loading).toBe(false);
    expect(result.current.modalVisible).toBe(false);
  });

  it("shows modal on invalid login", async () => {
    (getFromStorage as jest.Mock).mockResolvedValue({
      cpf: "123.456.789-00",
      password: "password123",
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.setCpf("invalid-cpf");
      result.current.setPassword("invalid-password");
      await result.current.handleSubmit();
    });

    expect(result.current.modalVisible).toBe(false);
  });
});
