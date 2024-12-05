import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { Ionicons } from "@expo/vector-icons";
import useDashboard from "./dashboard.hooks";
import styles from "./dashboard.styles";

type Product = {
  id: number;
  name: string;
  stock: number;
  unitPrice: number;
  totalPrice: number;
};

const DashboardScreen = () => {
  const router = useRouter();

  const {
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
  } = useDashboard();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.header}>
            <TextInput
              style={styles.input}
              placeholder="Search Product"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              testID="options-button"
              onPress={() => router.push("/user-settings")}
            >
              <Ionicons name="options-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.infoText}>
            To create a new product, you need to provide Name, Stock Quantity,
            Unit Price.
          </Text>

          <View style={styles.newProduct}>
            <Button
              title="Add New Product"
              onPress={() => setModalVisible(true)}
            />
          </View>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalOverlay}>
                {" "}
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>Add New Product</Text>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Name"
                    value={newProduct.name}
                    onChangeText={(value) =>
                      setNewProduct((prev) => ({ ...prev, name: value }))
                    }
                    placeholderTextColor="#ccc"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChangeText={(value) =>
                      setNewProduct((prev) => ({ ...prev, stock: value }))
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#ccc"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Unit Price"
                    value={newProduct.unitPrice}
                    onChangeText={(value) =>
                      setNewProduct((prev) => ({ ...prev, unitPrice: value }))
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#ccc"
                  />
                  <View style={styles.addButton}>
                    <Button title="Add Product" onPress={addProduct} />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <DraggableFlatList
            data={filterProducts()}
            keyExtractor={(item) => item.id.toString()}
            onDragEnd={({ data }) => setProducts(data)}
            ListHeaderComponent={
              <View style={styles.headerRow}>
                {["ID", "Name", "Stock", "Value", "Total Value"].map(
                  (header, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        sortByField(
                          header.toLowerCase().replace(" ", "") as keyof Product
                        )
                      }
                      style={styles.headerCell}
                    >
                      <Text style={styles.headerText}>{header}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            }
            renderItem={({ item, drag }: RenderItemParams<Product>) => (
              <TouchableOpacity onLongPress={drag} style={styles.productRow}>
                <View style={styles.text}>
                  <Text style={styles.productCell}>{item.id}</Text>
                  <Text style={styles.productCell}>{item.name}</Text>
                  <Text style={styles.productCell}>{item.stock}</Text>
                  <Text style={styles.productCell}>
                    {item.unitPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.productCell}>
                    {item.totalPrice.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => updateStock(item.id, true)}
                  >
                    <Text style={styles.actionText}>Add 1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => updateStock(item.id, false)}
                  >
                    <Text style={styles.actionText}>Remove 1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => deleteProduct(item.id)}
                  >
                    <Text style={styles.actionText}>Exclude</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DashboardScreen;
