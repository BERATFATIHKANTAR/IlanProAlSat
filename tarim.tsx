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

// İŞ VE TARIM MAKİNELERİ HİYERARŞİSİ
const MACHINERY_DATA: any = {
  id: "root",
  label: "İş Makineleri & Sanayi",
  children: [
    {
      id: "hafriyat-ve-insaat",
      label: "Hafriyat & İnşaat",
      icon: "🏗️",
      color: "#FEF3C7", // Endüstriyel sarı tonu
      children: [
        { id: "ekskavator", label: "Ekskavatör", count: 420 },
        { id: "dozer", label: "Dozer", count: 180 },
        { id: "kepce-loader", label: "Kepçe & Yükleyici (Loader)", count: 310 },
        { id: "silindir", label: "Toprak Silindiri", count: 85 },
      ],
    },
    {
      id: "tarim-makineleri",
      label: "Tarım & Ziraat",
      icon: "🚜",
      color: "#DCFCE7", // Tarım yeşili tonu
      children: [
        { id: "traktor", label: "Traktör", count: 1250 },
        { id: "bicerdover", label: "Biçerdöver", count: 140 },
        { id: "balya-makinesi", label: "Balya Makinesi", count: 210 },
        { id: "pulluk-mibzer", label: "Ekim & Dikim Makineleri", count: 430 },
      ],
    },
    {
      id: "yol-ve-asfalt",
      label: "Yol Yapım & Asfalt Makineleri",
      icon: "🛣️",
      color: "#FFEDD5", // Turuncu tonu
      children: [
        { id: "asfalt-serici", label: "Asfalt Serici (Finisher)", count: 45 },
        { id: "asfalt-kazima", label: "Asfalt Kazıma Makinesi", count: 28 },
        { id: "asfalt-silindiri", label: "Asfalt Silindiri", count: 62 },
        { id: "zift-tankeri", label: "Distribütör & Tanker", count: 35 },
      ],
    },
    {
      id: "maden-ve-tas-kirma",
      label: "Maden, Taş Kırma & Kum",
      icon: "🪨",
      color: "#F1F5F9", // Taş/Kaya gri tonu
      children: [
        { id: "konkasor", label: "Taş Kırma Tesisi (Konkasör)", count: 52 },
        { id: "eleme-makinesi", label: "Kum Eleme & Yıkama", count: 74 },
        { id: "mobil-kirici", label: "Mobil Kırıcılar", count: 31 },
        { id: "kaya-kamyonu", label: "Belden Kırmalı Kaya Kamyonu", count: 48 },
      ],
    },
  ],
};

export default function TarimScreen() {
  const [history, setHistory] = useState([MACHINERY_DATA]);
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
      console.log(`${item.label} makineleri listeleniyor...`);
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
                      {item.count.toLocaleString()} Makine
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
  breadRow: { flexDirection: "row", alignItems: "center" }, // Hata veren yer düzeltildi.
  breadText: { color: "#94A3B8", fontSize: 14, fontWeight: "500" },
  breadActive: { color: "#EA580C", fontWeight: "700" }, 
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