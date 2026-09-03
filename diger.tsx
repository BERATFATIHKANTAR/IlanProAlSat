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

// DİĞER ÜRÜNLER VE KATEGORİLER HİYERARŞİSİ
const OTHER_CATEGORIES_DATA: any = {
  id: "root",
  label: "Diğer Her Şey",
  children: [
    {
      id: "ev-ve-yasam",
      label: "Ev & Yaşam",
      icon: "🪑",
      color: "#FFEDD5", // Turuncu/Krem tonu
      children: [
        { id: "mobilya", label: "Mobilya", count: 840 },
        { id: "ev-tekstili", label: "Ev Tekstili", count: 520 },
        { id: "aydinlatma", label: "Aydınlatma Ürünleri", count: 190 },
        { id: "dekorasyon", label: "Dekoratif Objeler", count: 310 },
      ],
    },
    {
      id: "giyim-aksesuar",
      label: "Giyim & Aksesuar",
      icon: "👕",
      color: "#FCE7F3", // Pembe tonu
      children: [
        { id: "erkek-giyim", label: "Erkek Giyim", count: 1100 },
        { id: "kadin-giyim", label: "Kadın Giyim", count: 1750 },
        { id: "ayakkabi", label: "Ayakkabı & Çanta", count: 920 },
        { id: "saat-gozluk", label: "Saat & Gözlük", count: 430 },
      ],
    },
    {
      id: "hobi-ve-eglence",
      label: "Hobi, Kitap & Müzik",
      icon: "🎨",
      color: "#E0F2FE", // Açık mavi tonu
      children: [
        { id: "kitap-dergi", label: "Kitap & Dergi", count: 2100 },
        { id: "muzik-aletleri", label: "Müzik Enstrümanları", count: 145 },
        { id: "oyuncak", label: "Oyuncak & Atari", count: 380 },
        { id: "koleksiyon", label: "Antika & Koleksiyon", count: 95 },
      ],
    },
    {
      id: "spor-outdoor",
      label: "Spor & Outdoor",
      icon: "⚽",
      color: "#DCFCE7", // Yeşil tonu
      children: [
        { id: "kamp-malzemeleri", label: "Kamp Ekipmanları", count: 260 },
        { id: "fitness", label: "Fitness & Kardiyo", count: 185 },
        { id: "bisiklet", label: "Bisiklet", count: 320 },
      ],
    },
  ],
};

export default function DigerScreen() {
  const [history, setHistory] = useState([OTHER_CATEGORIES_DATA]);
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
      console.log(`${item.label} ilanları listeleniyor...`);
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
                      {item.count.toLocaleString()} İlan
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
  breadActive: { color: "#475569", fontWeight: "700" }, // Genel tema için Slate Gri tonu
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