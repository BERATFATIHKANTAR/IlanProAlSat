import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Profilim</Text>

          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color="#111827"
            />
          </TouchableOpacity>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>Ahmet Yılmaz</Text>
          <Text style={styles.email}>
            ahmet@email.com
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>
                Aktif İlan
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>312</Text>
              <Text style={styles.statLabel}>
                Görüntülenme
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>
                Favori
              </Text>
            </View>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Hesap
          </Text>

          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="create-outline"
              size={22}
              color="#2563EB"
            />
            <Text style={styles.itemText}>
              Profili Düzenle
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="list-outline"
              size={22}
              color="#2563EB"
            />
            <Text style={styles.itemText}>
              İlanlarım
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="heart-outline"
              size={22}
              color="#2563EB"
            />
            <Text style={styles.itemText}>
              Favorilerim
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>
        </View>

        {/* SETTINGS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Ayarlar
          </Text>

          <View style={styles.item}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#2563EB"
            />
            <Text style={styles.itemText}>
              Bildirimler
            </Text>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>

          <View style={styles.item}>
            <Ionicons
              name="moon-outline"
              size={22}
              color="#2563EB"
            />
            <Text style={styles.itemText}>
              Koyu Mod
            </Text>

            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
            />
          </View>
        </View>

        {/* SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Destek
          </Text>

          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="help-circle-outline"
              size={22}
              color="#2563EB"
            />
            <Text style={styles.itemText}>
              Yardım Merkezi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#2563EB"
            />
            <Text style={styles.itemText}>
              Hakkında
            </Text>
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#EF4444"
          />
          <Text style={styles.logoutText}>
            Çıkış Yap
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  email: {
    color: "#6B7280",
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  statBox: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2563EB",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    paddingVertical: 8,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#6B7280",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },

  itemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  logoutBtn: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "800",
    fontSize: 15,
  },
});