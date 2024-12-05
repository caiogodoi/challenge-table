import React from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import SpaceImage from "../../assets/images/space.jpg";

import { cpfMask } from "@/utils";
import ModalComponent from "@/components/Modal";
import BiometryModal from "@/components/BiometryModal";
import useCreateAccount from "./create-account.hooks";
import styles from "./create-account.styles";

const CreateAccountScreen: React.FC = () => {
  const {
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
  } = useCreateAccount();

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
              <Text style={styles.title}>Create Account</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    errors.firstAndLastName ? styles.inputError : null,
                  ]}
                  placeholder="First and Last Name"
                  placeholderTextColor="#ccc"
                  value={firstAndLastName}
                  onChangeText={(text) => {
                    setFirstAndLastName(text);
                    handleValidation("firstAndLastName", text);
                  }}
                />
                {errors.firstAndLastName ? (
                  <Text style={styles.errorText}>
                    {errors.firstAndLastName}
                  </Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, errors.cpf ? styles.inputError : null]}
                  placeholder="CPF"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  value={cpfMask(cpf)}
                  onChangeText={(text) => {
                    setCpf(text);
                    handleValidation("cpf", text);
                  }}
                />
                {errors.cpf ? (
                  <Text style={styles.errorText}>{errors.cpf}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    errors.password ? styles.inputError : null,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#ccc"
                  secureTextEntry
                  value={password}
                  maxLength={12}
                  onChangeText={(text) => {
                    setPassword(text);
                    handleValidation("password", text);
                  }}
                />
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !isFormValid && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submitText}>Confirm</Text>
                )}
              </TouchableOpacity>

              <Link href="/login">
                <Text style={styles.loginText}>
                  Already have an account? Login.
                </Text>
              </Link>
            </View>
          </ScrollView>
          <ModalComponent
            visibility={modalVisible}
            setVisibility={setModalVisible}
            modalMassage="This CPF is already registered."
          />
          <BiometryModal
            visibility={biometryModalVisible}
            setVisibility={setBiometryModalVisible}
            onAccept={() => handleBiometryModal(true)}
            onReject={() => handleBiometryModal(false)}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;
