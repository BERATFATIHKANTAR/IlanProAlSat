import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ELEKTRONİK ÜRÜNLER HİYERARŞİSİ
const ELECTRONIC_DATA: any = {
  id: "root",
  label: "Elektronik",
  children: [
    {
      id: "bilgisayar",
      label: "Bilgisayar",
      icon: "💻",
      color: "#EEF2F6", // Açık gri/mavi tonu
      children: [
        { id: "laptop", label: "Dizüstü (Laptop)", count: 1450 },
        { id: "desktop", label: "Masaüstü (Desktop)", count: 820 },
        { id: "all-in-one", label: "All-in-One Bilgisayar", count: 120 },
        { id: "tablet", label: "Tablet", count: 640 },
      ],
    },
    {
      id: "harici-ekipmanlar",
      label: "Çevre Birimleri & Ekipman",
      icon: "⌨️",
      color: "#E0E7FF", // İndigo tonu
      children: [
        { id: "monitor", label: "Monitör", count: 410 },
        { id: "klavye", label: "Klavye", count: 320 },
        { id: "mouse", label: "Mouse (Fare)", count: 290 },
        { id: "kulaklik", label: "Kulaklık", count: 480 },
        { id: "webcam", label: "Web Kamerası", count: 95 },
      ],
    },
    {
      id: "donanim-bilesenleri",
      label: "Bilgisayar Bileşenleri (Donanım)",
      icon: "🔌",
      color: "#F3E8FF", // Mor tonu
      children: [
        { id: "ekran-karti", label: "Ekran Kartı", count: 230 },
        { id: "islemci", label: "İşlemci (CPU)", count: 145 },
        { id: "ram", label: "Bellek (RAM)", count: 180 },
        { id: "depolama", label: "SSD / Harddisk", count: 260 },
        { id: "anakart", label: "Anakart", count: 115 },
      ],
    },
    {
      id: "oyuncu-ozel",
      label: "Oyuncu (Gaming) Özel",
      icon: "🎮",
      color: "#FCE7F3", // Pembe tonu
      children: [
        { id: "konsol", label: "Oyun Konsolları", count: 190 },
        { id: "gaming-koltuk", label: "Oyuncu Koltuğu", count: 85 },
        { id: "gamepad", label: "Gamepad / Direksiyon", count: 140 },
      ],
    },
  ],
};

export default function ElektronikScreen() {
  const [history, setHistory] = useState([ELECTRONIC_DATA]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentLevel = history[history.length - 1];

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    callback();
  };

  const handleSelect = (item: any) => {
    if (item.children) {
      animateTransition(() => setHistory([...history, item]));
    } else {
      console.log(`${item.label} ürünleri listeleniyor...`);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      animateTransition(() => setHistory(history.slice(0, -1)));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ÜST YOL TAKİBİ (BREADCRUMB) */}
      <View style={styles.breadcrumb}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {history.map((step, index) => (
            <View key={step.id} style={styles.breadRow}>
              <TouchableOpacity
                onPress={() => setHistory(history.slice(0, index + 1))}
              >
                <Text
                  style={[
                    styles.breadText,
                    index === history.length - 1 && styles.breadActive,
                  ]}
                >
                  {step.label}
                </Text>
              </TouchableOpacity>
              {index < history.length - 1 && (
                <Text style={styles.breadSeparator}> {">"} </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* KATEGORİ LİSTESİ */}
      <Animated.View style={[styles.listWrapper, { opacity: fadeAnim }]}>
        <FlatList
          data={currentLevel.children}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleSelect(item)}
            >
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: item.color || "#F1F5F9" },
                  ]}
                >
                  <Text style={styles.iconText}>{item.icon || "📁"}</Text>
                </View>
                <View>
                  <Text style={styles.label}>{item.label}</Text>
                  {item.count !== undefined && (
                    <Text style={styles.subCount}>
                      {item.count.toLocaleString()} Ürün
                    </Text>
                  )}
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      {/* GERİ DÖN BUTONU */}
      {history.length > 1 && (
        <TouchableOpacity style={styles.floatingBack} onPress={goBack}>
          <Text style={styles.backButtonText}>‹ Geri Dön</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  breadcrumb: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  breadRow: { flexDirection: "row", alignItems: "center" },
  breadText: { color: "#94A3B8", fontSize: 14, fontWeight: "500" },
  breadActive: { color: "#6366F1", fontWeight: "700" }, // Elektronik temasına uygun Indigo/Mor renk
  breadSeparator: { color: "#CBD5E1", marginHorizontal: 8 },
  listWrapper: { flex: 1 },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconText: { fontSize: 22 },
  label: { fontSize: 16, color: "#1E293B", fontWeight: "600" },
  subCount: { fontSize: 12, color: "#64748B", marginTop: 2 },
  arrow: { fontSize: 24, color: "#CBD5E1" },
  floatingBack: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  backButtonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});