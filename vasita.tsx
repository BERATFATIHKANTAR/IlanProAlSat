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

// VASITA HİYERARŞİSİ
const VEHICLE_DATA: any = {
  id: "root",
  label: "Vasıta",
  children: [
    {
      id: "otomobil",
      label: "Otomobil",
      icon: "🚗",
      color: "#FFE4E6", // Kırmızımsı ton
      children: [
        { id: "sedan", label: "Sedan", count: 2450 },
        { id: "hatchback", label: "Hatchback", count: 1820 },
        { id: "suv", label: "SUV", count: 960 },
        { id: "station-wagon", label: "Station Wagon", count: 140 },
        { id: "coupe", label: "Coupe", count: 85 },
      ],
    },
    {
      id: "motosiklet",
      label: "Motosiklet",
      icon: "🏍️",
      color: "#E0F2FE", // Açık mavi
      children: [
        { id: "scooter", label: "Scooter", count: 1100 },
        { id: "naked", label: "Naked", count: 450 },
        { id: "racing", label: "SuperSport", count: 230 },
        { id: "touring", label: "Touring", count: 120 },
      ],
    },
    {
      id: "ticari-araclar",
      label: "Ticari Araçlar",
      icon: "🚚",
      color: "#FEF3C7", // Sarı/Turuncu tonu
      children: [
        { id: "minivan", label: "Minivan & Panelvan", count: 680 },
        { id: "kamyon", label: "Kamyon & Kamyonet", count: 320 },
        { id: "bus", label: "Otobüs & Minibüs", count: 145 },
      ],
    },
    {
      id: "deniz-araclari",
      label: "Deniz Araçları",
      icon: "🚤",
      color: "#ECFDF5", // Su yeşili
      children: [
        { id: "motoryat", label: "Motoryat", count: 42 },
        { id: "yelkenli", label: "Yelkenli", count: 28 },
        { id: "surat-teknesi", label: "Sürat Teknesi", count: 55 },
      ],
    },
  ],
};

export default function VasitaScreen() {
  const [history, setHistory] = useState([VEHICLE_DATA]);
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
      console.log(`${item.label} araçları listeleniyor...`);
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
  breadActive: { color: "#F43F5E", fontWeight: "700" }, // Vasıta için kırmızımsı ton
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