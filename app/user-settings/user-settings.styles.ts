import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 60,
    color: "#fff",
  },
  toggleContainer: {
    flex: 1,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 20,
  },
});

export default styles;
