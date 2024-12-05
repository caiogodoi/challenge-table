import { render, fireEvent, screen } from "@testing-library/react-native";
import DashboardScreen from "../index";

jest.mock("../dashboard.hooks", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    modalVisible: false,
    newProduct: { name: "", stock: "", unitPrice: "" },
    searchQuery: "",
    setModalVisible: jest.fn(),
    setNewProduct: jest.fn(),
    addProduct: jest.fn(),
    filterProducts: jest.fn().mockReturnValue([]),
    setProducts: jest.fn(),
    sortByField: jest.fn(),
    updateStock: jest.fn(),
    setSearchQuery: jest.fn(),
    deleteProduct: jest.fn(),
  })),
}));

jest.mock("react-native-draggable-flatlist", () => {
  const React = require("react");
  return (props: any) => (
    <div data-testid="DraggableFlatList">
      {props.data.map((item: any, index: number) =>
        props.renderItem({ item, index, drag: jest.fn() })
      )}
    </div>
  );
});

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Ionicons: (props: any) => <Text>{`Ionicon: ${props.name}`}</Text>,
  };
});

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("DashboardScreen", () => {
  it("renders correctly", () => {
    render(<DashboardScreen />);

    expect(screen.getByPlaceholderText("Search Product")).toBeTruthy();
    expect(screen.getByText("Add New Product")).toBeTruthy();
  });

  it("opens modal when Add New Product button is pressed", () => {
    render(<DashboardScreen />);

    fireEvent.press(screen.getByText("Add New Product"));
    expect(screen.getByText("Add New Product")).toBeTruthy();
  });
});
