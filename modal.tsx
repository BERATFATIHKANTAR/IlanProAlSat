import { Link } from "expo-router";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ModalScreen() {
  return (
    <ThemedView style={styles.overlay}>
      <View style={styles.modal}>
        <ThemedText type="title">İşlem Seç</ThemedText>

        <ThemedText style={styles.subtitle}>
          Devam etmek için bir seçenek seç
        </ThemedText>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.buttonPrimary}>
            <ThemedText style={styles.buttonPrimaryText}>
              İlanı Görüntüle
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecondary}>
            <ThemedText style={styles.buttonSecondaryText}>
              Düzenle
            </ThemedText>
          </TouchableOpacity>

          <Link href="/" dismissTo asChild>
            <TouchableOpacity style={styles.closeButton}>
              <ThemedText style={styles.closeText}>Kapat</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#fff",
    padding: 22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  subtitle: {
    marginTop: 8,
    color: "#6B7280",
    fontSize: 14,
  },

  actions: {
    marginTop: 20,
    gap: 12,
  },

  buttonPrimary: {
    backgroundColor: "#0B3D91",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "800",
  },

  buttonSecondary: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonSecondaryText: {
    color: "#111827",
    fontWeight: "700",
  },

  closeButton: {
    marginTop: 8,
    alignItems: "center",
    padding: 10,
  },

  closeText: {
    color: "#6B7280",
    fontWeight: "600",
  },
});