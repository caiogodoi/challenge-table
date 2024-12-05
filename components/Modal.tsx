import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
	StyleSheet,
  Modal,
} from "react-native";

interface IModal {
	modalMassage: string;
	visibility: boolean;
	setVisibility: (value: boolean) => void
}

const ModalComponent: React.FC<IModal> = ({ modalMassage, visibility, setVisibility }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visibility}
			onRequestClose={() => setVisibility(false)}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalText}>{modalMassage}</Text>
					<TouchableOpacity
						style={styles.modalButton}
						onPress={() => setVisibility(false)}
					>
						<Text style={styles.modalButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

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
});

export default ModalComponent;