import authenticateUser from "@/hooks/UseBiometry";
import { generateToken, getFromStorage, setToStorage } from "@/utils";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

const useLogin = () => {
  const usernameScale = useRef(new Animated.Value(1)).current;
  const passwordScale = useRef(new Animated.Value(1)).current;
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFocus = (inputScale: Animated.Value) => {
    Animated.timing(inputScale, {
      toValue: 1.05,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (inputScale: Animated.Value) => {
    Animated.timing(inputScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const getUser = await getFromStorage("userData");

    setTimeout(async () => {
      setLoading(false);
      if (getUser.cpf === cpf && getUser.password === password) {
        const token = generateToken();
        await setToStorage("token", token);
        router.replace("/dashboard");
      } else {
        setModalVisible(true);
      }
    }, 2000);
  };

  const authBiometry = async () => {
    const hasBiometry = await getFromStorage("hasBiometry");
    const success = () => {
      router.replace("/dashboard");
    };
    if (hasBiometry) {
      setTimeout(async () => {
        await authenticateUser({ successAuth: success });
      }, 2000);
    }
  };

  const memoizedAuthBiometry = useCallback(() => {
    authBiometry();
  }, []);

  useEffect(() => {
    memoizedAuthBiometry();
  }, []);

  return {
    usernameScale,
    cpf,
    loading,
    modalVisible,
    passwordScale,
    password,
    setCpf,
    handleFocus,
    handleBlur,
    setPassword,
    handleSubmit,
    setModalVisible,
  };
};

export default useLogin;
