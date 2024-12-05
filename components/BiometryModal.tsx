import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

interface IBiometryModal {
  visibility: boolean;
  setVisibility: (value: boolean) => void;
  onAccept?: () => void;
  onReject?: () => void;
}

const BiometryModal: React.FC<IBiometryModal> = ({
  visibility,
  setVisibility,
  onAccept,
  onReject,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => setVisibility(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you want to enable biometry?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.acceptButton]}
              onPress={() => {
                setVisibility(false);
                onAccept?.();
              }}
            >
              <Text style={styles.modalButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.rejectButton]}
              onPress={() => {
                setVisibility(false);
                onReject?.();
              }}
            >
              <Text style={styles.modalButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
  },
  acceptButton: {
    backgroundColor: "#2196F3",
  },
  rejectButton: {
    backgroundColor: "#FF5733",
  },
});

export default BiometryModal;
