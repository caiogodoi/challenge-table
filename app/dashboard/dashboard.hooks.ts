import { useState } from "react";
import { Alert } from "react-native";

type Product = {
  id: number;
  name: string;
  stock: number;
  unitPrice: number;
  totalPrice: number;
};

const useDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    unitPrice: "",
  });

  const getNextId = (): number => {
    const ids = products.map((product) => product.id);
    for (let i = 1; ; i++) {
      if (!ids.includes(i)) return i;
    }
  };

  const addProduct = () => {
    const { name, stock, unitPrice } = newProduct;

    if (
      !name ||
      !stock ||
      !unitPrice ||
      isNaN(Number(stock)) ||
      isNaN(Number(unitPrice))
    ) {
      Alert.alert("Error", "Please fill all fields with valid data.");
      return;
    }

    const stockNumber = parseInt(stock);
    const unitPriceNumber = parseFloat(unitPrice);

    if (stockNumber <= 0) {
      Alert.alert("Error", "Stock must be greater than 0.");
      return;
    }

    const id = getNextId();
    const totalPrice = stockNumber * unitPriceNumber;

    setProducts((prev) => [
      ...prev,
      { id, name, stock: stockNumber, unitPrice: unitPriceNumber, totalPrice },
    ]);
    setNewProduct({ name: "", stock: "", unitPrice: "" });
    setModalVisible(false);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const updateStock = (id: number, increment: boolean) => {
    setProducts((prev) =>
      prev
        .map((product) => {
          if (product.id === id) {
            const updatedStock = product.stock + (increment ? 1 : -1);
            return {
              ...product,
              stock: updatedStock,
              totalPrice: updatedStock * product.unitPrice,
            };
          }
          return product;
        })
        .filter((product) => product.stock > 0)
    );
  };

  const filterProducts = () => {
    if (!searchQuery) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortByField = <T extends keyof Product>(field: T) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (typeof a[field] === "string") {
        return a[field].toString().localeCompare(b[field].toString());
      }
      return (a[field] as number) - (b[field] as number);
    });
    setProducts(sortedProducts);
  };

  return {
    modalVisible,
    newProduct,
    searchQuery,
    setModalVisible,
    setNewProduct,
    addProduct,
    filterProducts,
    setProducts,
    sortByField,
    updateStock,
    setSearchQuery,
    deleteProduct,
  };
};

export default useDashboard;
