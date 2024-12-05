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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
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
  inputError: {
    borderColor: "red",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    width: "85%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  submitButtonDisabled: {
    backgroundColor: "#6c757d",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#00f",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default styles;
