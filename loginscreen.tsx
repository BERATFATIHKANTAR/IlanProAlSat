import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    Alert.alert("Başarılı", "Giriş yapıldı.");

    router.push("/profilescreen" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2563EB"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <Ionicons
                name="storefront"
                size={42}
                color="#fff"
              />
            </View>

            <Text style={styles.title}>
              Hoş Geldin 👋
            </Text>

            <Text style={styles.subtitle}>
              Hesabına giriş yap ve ilanları keşfet
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            {/* EMAIL */}
            <Text style={styles.label}>E-Posta</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={22}
                color="#64748B"
              />

              <TextInput
                placeholder="ornek@mail.com"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* PASSWORD */}
            <Text style={styles.label}>Şifre</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color="#64748B"
              />

              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                secureTextEntry={secure}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() => setSecure(!secure)}
              >
                <Ionicons
                  name={
                    secure
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={22}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            {/* FORGOT PASSWORD */}
            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() =>
                router.push("/forgetpassword" as any)
              }
            >
              <Text style={styles.forgotText}>
                Şifremi Unuttum
              </Text>
            </TouchableOpacity>

            {/* LOGIN BUTTON */}
            <TouchableOpacity
              style={styles.loginBtn}
              activeOpacity={0.9}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>
                Giriş Yap
              </Text>
            </TouchableOpacity>

            {/* DIVIDER */}
            <View style={styles.dividerArea}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>veya</Text>
              <View style={styles.divider} />
            </View>

            {/* GOOGLE */}
            <TouchableOpacity style={styles.googleBtn}>
              <Ionicons
                name="logo-google"
                size={20}
                color="#EA4335"
              />

              <Text style={styles.googleText}>
                Google ile Devam Et
              </Text>
            </TouchableOpacity>

            {/* REGISTER */}
            <View style={styles.bottomArea}>
              <Text style={styles.bottomText}>
                Hesabın yok mu?
              </Text>

              <TouchableOpacity
                onPress={() =>
                  router.push("/registerscreen" as any)
                }
              >
                <Text style={styles.registerText}>
                  {" "}Kayıt Ol
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  logoBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(0, 0, 0, 0.41)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    lineHeight: 22,
  },

  form: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
    marginTop: 8,
  },

  inputContainer: {
    height: 58,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#000000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#0F172A",
  },

  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 26,
  },

  forgotText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 14,
  },

  loginBtn: {
    height: 58,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  dividerArea: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 26,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  dividerText: {
    marginHorizontal: 12,
    color: "#94A3B8",
    fontWeight: "600",
  },

  googleBtn: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },

  googleText: {
    marginLeft: 10,
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },

  bottomArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 20,
  },

  bottomText: {
    color: "#64748B",
    fontSize: 14,
  },

  registerText: {
    color: "#2563EB",
    fontWeight: "800",
    fontSize: 14,
  },
});