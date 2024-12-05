import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
  },
  infoText: {
    marginBottom: 10,
    fontSize: 14,
    color: "#555",
  },
  newProduct: {
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "40%",
    justifyContent: "center",
  },
  modalInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
  productCell: {
    flex: 1,
    textAlign: "center",
  },
  productRow: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    marginTop: 10,
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    paddingRight: 10,
    width: "80%",
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: "20%",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f1f1f1",
  },
  headerCell: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default styles;
