import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { setToStorage, getFromStorage } from "@/utils";

const Index: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const fakeCheck = async (): Promise<string | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await fakeCheck();
        const user = await getFromStorage("userData");
        if (user) {
          router.replace("/login");
        } else {
          router.replace("/create-account");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.replace("/create-account");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#007BFF" />}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
