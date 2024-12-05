import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getFromStorage, setToStorage } from "@/utils";

const useUserSettings = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBiometryEnabled, setIsBiometryEnabled] = useState(false);

  const getStoragedValues = async () => {
    const storagedDarkMode = await getFromStorage("darkMode");
    const storagedBiometry = await getFromStorage("hasBiometry");

    setIsDarkMode(storagedDarkMode);
    setIsBiometryEnabled(storagedBiometry);
  };

  const handleBack = () => {
    router.back();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setToStorage("darkMode", !isDarkMode);
  };

  const toggleBiometry = () => {
    setIsBiometryEnabled(!isBiometryEnabled);
    setToStorage("hasBiometry", !isBiometryEnabled);
  };

  useEffect(() => {
    getStoragedValues();
  }, []);

  return {
    handleBack,
    isDarkMode,
    toggleDarkMode,
    isBiometryEnabled,
    toggleBiometry,
  };
};

export default useUserSettings;
