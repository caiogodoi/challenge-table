import React from "react";
import { View, Text, Switch, ImageBackground } from "react-native";
import useUserSettings from "./user-settings.hooks";
import styles from "./user-settings.styles";
import SpaceImage from "../../assets/images/space.jpg";

const ConfigScreen = () => {
  const { isDarkMode, toggleDarkMode, isBiometryEnabled, toggleBiometry } =
    useUserSettings();

  return (
    <ImageBackground source={SpaceImage} style={styles.background}>
      <Text style={styles.title}>Configure your settings</Text>
      <View style={styles.toggleContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.text} accessibilityLabel="Dark Mode">
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            accessibilityLabel="dark-mode-switch"
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.text} accessibilityLabel="Biometry">
            Biometry
          </Text>
          <Switch
            value={isBiometryEnabled}
            onValueChange={toggleBiometry}
            accessibilityLabel="biometry-switch"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ConfigScreen;
