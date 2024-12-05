import React from "react";
import {
  Animated,
  ImageBackground,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import SpaceImage from "../../assets/images/space.jpg";
import { cpfMask } from "@/utils";
import ModalComponent from "@/components/Modal";
import useLogin from "./login.hooks";
import styles from "./login.styles";

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const {
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
  } = useLogin();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={SpaceImage} style={styles.background}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Text style={styles.title}>Login</Text>
              <Animated.View
                style={[
                  styles.animatedInputContainer,
                  { transform: [{ scale: usernameScale }] },
                ]}
              >
                <TextInput
                  style={styles.input}
                  value={cpfMask(cpf)}
                  onChangeText={(text) => setCpf(text)}
                  placeholder="Username"
                  placeholderTextColor="#ccc"
                  onFocus={() => handleFocus(usernameScale)}
                  onBlur={() => handleBlur(usernameScale)}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.animatedInputContainer,
                  { transform: [{ scale: passwordScale }] },
                ]}
              >
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Password"
                  placeholderTextColor="#ccc"
                  secureTextEntry
                  onFocus={() => handleFocus(passwordScale)}
                  onBlur={() => handleBlur(passwordScale)}
                />
              </Animated.View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submitText}>Submit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                testID="options-button"
                onPress={() => router.push("/user-settings")}
              >
                <Text style={styles.createAccountText}>Create an Account</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <ModalComponent
        visibility={modalVisible}
        setVisibility={setModalVisible}
        modalMassage="Invalid username or password."
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
