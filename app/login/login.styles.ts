import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  animatedInputContainer: {
    width: "85%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    width: "85%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccountText: {
    color: "#00f",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});

export default styles;
