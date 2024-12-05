import { renderHook, act } from "@testing-library/react-hooks";
import useDashboard from "../dashboard.hooks";
import { Alert } from "react-native";

jest.mock("react-native", () => ({
  Alert: { alert: jest.fn() },
}));

describe("useDashboard hook", () => {
  it("should not add product if fields are invalid", () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.setNewProduct({
        name: "",
        stock: "",
        unitPrice: "",
      });
      result.current.addProduct();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Please fill all fields with valid data."
    );
  });

  it("should filter products by search query", () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.setProducts([
        { id: 1, name: "Product A", stock: 10, unitPrice: 20, totalPrice: 200 },
        { id: 2, name: "Product B", stock: 5, unitPrice: 30, totalPrice: 150 },
      ]);
      result.current.setSearchQuery("Product A");
    });

    const filteredProducts = result.current.filterProducts();
    expect(filteredProducts).toHaveLength(1);
    expect(filteredProducts[0].name).toBe("Product A");
  });

  it("should update stock correctly", () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.setProducts([
        { id: 1, name: "Product A", stock: 10, unitPrice: 20, totalPrice: 200 },
      ]);
      result.current.updateStock(1, true);
    });

    const updatedProduct = result.current.filterProducts()[0];
    expect(updatedProduct.stock).toBe(11);
    expect(updatedProduct.totalPrice).toBe(220);
  });
});
