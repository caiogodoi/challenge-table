import { getFromStorage, setToStorage, validateCPF } from "@/utils";
import { router } from "expo-router";
import { useState } from "react";

const useCreateAccount = () => {
  const [firstAndLastName, setFirstAndLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [biometryModalVisible, setBiometryModalVisible] = useState(false);

  const [errors, setErrors] = useState({
    firstAndLastName: "",
    cpf: "",
    password: "",
  });

  const handleValidation = (field: string, value: string) => {
    const updatedErrors = { ...errors };

    if (field === "firstAndLastName") {
      updatedErrors.firstAndLastName =
        value.trim().split(" ").length >= 2
          ? ""
          : "Please enter your full name.";
    } else if (field === "cpf") {
      updatedErrors.cpf = validateCPF(value) ? "" : "Invalid CPF.";
    } else if (field === "password") {
      updatedErrors.password =
        value.length > 0 && value.length <= 12
          ? ""
          : "Password must be up to 12 characters.";
    }

    setErrors(updatedErrors);
  };

  const checkIfUserExists = async (): Promise<boolean> => {
    const user = await getFromStorage("userData");
    return cpf === user.cpf;
  };

  const handleSubmit = async () => {
    setBiometryModalVisible(true);
  };

  const handleBiometryModal = async (value: boolean) => {
    setBiometryModalVisible(false);
    if (value) {
      setToStorage("hasBiometry", value);
    }
    setLoading(true);
    try {
      const userExist = await checkIfUserExists();

      if (userExist) {
        setModalVisible(true);
        setLoading(false);
        return;
      }

      await setToStorage("userData", { name: firstAndLastName, cpf, password });

      setTimeout(() => {
        setLoading(false);
        router.replace("/login");
      }, 2000);
    } catch (e) {
      setLoading(false);
      alert("Failed to save the data.");
    }
  };

  const isFormValid =
    firstAndLastName &&
    cpf &&
    password &&
    !errors.firstAndLastName &&
    !errors.cpf &&
    !errors.password;

  return {
    loading,
    modalVisible,
    biometryModalVisible,
    isFormValid,
    errors,
    firstAndLastName,
    cpf,
    password,
    handleValidation,
    handleSubmit,
    handleBiometryModal,
    setFirstAndLastName,
    setCpf,
    setPassword,
    setModalVisible,
    setBiometryModalVisible,
  };
};

export default useCreateAccount;
