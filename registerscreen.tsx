import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const handleRegister = () => {
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !passwordAgain
    ) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    if (password !== passwordAgain) {
      Alert.alert("Hata", "Şifreler eşleşmiyor.");
      return;
    }

    Alert.alert("Başarılı", "Üyelik oluşturuldu.");

    router.push("/loginscreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.logo}>
          İlan<Text style={styles.logoBold}>Pro</Text>
        </Text>

        <Text style={styles.title}>Üye Ol</Text>

        <Text style={styles.subtitle}>
          Yeni hesap oluştur
        </Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Ad Soyad"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />

          <TextInput
            placeholder="E-Posta"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />

          <TextInput
            placeholder="Telefon"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />

          <TextInput
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />

          <TextInput
            placeholder="Şifre Tekrar"
            value={passwordAgain}
            onChangeText={setPasswordAgain}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>
              Üye Ol
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/loginscreen")}
          >
            <Text style={styles.loginText}>
              Zaten hesabın var mı?
              <Text style={styles.loginLink}>
                {" "}
                Giriş Yap
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 10,
  },

  logoBold: {
    color: "#3B82F6",
    fontWeight: "900",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 6,
    marginBottom: 30,
    fontSize: 15,
  },

  form: {
    width: "100%",
  },

  input: {
    height: 54,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 14,
    color: "#0F172A",
  },

  registerButton: {
    height: 54,
    backgroundColor: "#3B82F6",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  loginText: {
    textAlign: "center",
    marginTop: 22,
    color: "#64748B",
    fontSize: 14,
  },

  loginLink: {
    color: "#3B82F6",
    fontWeight: "800",
  },
});