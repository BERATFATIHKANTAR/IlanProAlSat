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

// TAM İSTEDİĞİN EMLAK HİYERARŞİSİ
const CATEGORY_DATA: any = {
  id: "root",
  label: "Emlak",
  children: [
    {
      id: "konut",
      label: "Konut",
      icon: "🏠",
      color: "#DBEAFE", // Mavi tonu
      children: [
        { id: "daire", label: "Daire", count: 1240 },
        { id: "villa", label: "Villa", count: 85 },
        { id: "residence", label: "Residence", count: 150 },
        { id: "mustakil", label: "Müstakil Ev", count: 210 },
      ],
    },
    {
      id: "arsa",
      label: "Arsa",
      icon: "🚜",
      color: "#DCFCE7", // Yeşil tonu
      children: [
        { id: "tarla", label: "Tarla", count: 850 },
        { id: "imarli-arsa", label: "İmarlı Arsa", count: 420 },
        { id: "zeytinlik", label: "Zeytinlik", count: 110 },
        { id: "bahce", label: "Bahçe", count: 320 },
      ],
    },
    {
      id: "is-yeri",
      label: "İş Yeri",
      icon: "🏢",
      color: "#FEF3C7", // Sarı/Turuncu tonu
      children: [
        { id: "dukkan", label: "Dükkan", count: 540 },
        { id: "fabrika", label: "Fabrika", count: 12 },
        { id: "studio", label: "Stüdyo", count: 45 },
        { id: "ofis", label: "Ofis", count: 210 },
        { id: "depo", label: "Depo", count: 34 },
      ],
    },
  ],
};

export default function EmlakScreen() {
  const [history, setHistory] = useState([CATEGORY_DATA]);
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
      // En alt seviyeye tıklandığında yapılacak işlem (İlanları listeleme sayfasına gitme)
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
  breadActive: { color: "#3B82F6", fontWeight: "700" },
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
    // Gölgeler
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
