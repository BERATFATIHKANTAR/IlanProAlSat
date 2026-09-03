import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Listing = {
  id: string;
  title: string;
  price: string;
  location: string;
  date: string;
  image: string;
  category: string;
};

const CATEGORIES = [
  "Hepsi",
  "Otomobil",
  "Gayrimenkul",
  "Elektronik",
  "Tarım",
  "Ekipman",
];

const MENU_SECTIONS = [
  {
    title: "İLANLARIM VE İŞLEMLERİM",
    items: [
      {
        id: "m0",
        label: "Profilim",
        icon: "👤",
        type: "link",
        route: "/profilescreen",
      },
    ],
  },
  {
    title: "KATEGORİLER",
    items: [
      {
        id: "m1",
        label: "Emlak",
        icon: "🏠",
        type: "link",
        route: "/emlak",
      },
      {
        id: "m2",
        label: "Vasıta",
        icon: "🚗",
        type: "link",
        route: "/vasita",
      },
      {
        id: "m3",
        label: "Elektronik",
        icon: "📱",
        type: "link",
        route: "/elektronik",
      },
      {
        id: "m4",
        label: "İş Makineleri & Tarım",
        icon: "🚜",
        type: "link",
        route: "/tarim", 
      },
      {
        id: "m5",
        label: "Diğer",
        icon: "📦",
        type: "link",
        route: "/diger", 
      },
    ],
  },
  {
    title: "AYARLAR",
    items: [
      {
        id: "m6",
        label: "Koyu Mod",
        icon: "🌙",
        type: "toggle",
      },
      {
        id: "m7",
        label: "Dil Seçimi",
        icon: "🌐",
        type: "lang",
        value: "TR",
      },
    ],
  },
];

const LISTINGS: Listing[] = [
  {
    id: "1",
    title: "2017 Audi Q3 1.4 TFSI S-Tronic - Hatasız",
    price: "₺1.245.000",
    location: "Çorum, Merkez",
    date: "Bugün",
    category: "Otomobil",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
  },
  {
    id: "2",
    title: "Deniz Manzaralı Müstakil Villa 4+1",
    price: "₺12.750.000",
    location: "Muğla, Bodrum",
    date: "Bugün",
    category: "Gayrimenkul",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
  },
  {
    id: "3",
    title: "iPhone 15 Pro Max 256GB - Kapalı Kutu",
    price: "₺84.500",
    location: "İstanbul, Kadıköy",
    date: "Bugün",
    category: "Elektronik",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800",
  },
  {
    id: "4",
    title: "John Deere 5050E 4WD Kabinli Tarla Tipi",
    price: "₺920.000",
    location: "Konya, Selçuklu",
    date: "Dün",
    category: "Tarım",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
  },
  {
    id: "5",
    title: "2021 BMW 320i M Sport Cam Tavan",
    price: "₺2.150.000",
    location: "Ankara, Çankaya",
    date: "Bugün",
    category: "Otomobil",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
  },
  {
    id: "6",
    title: "MacBook Pro M3 16GB 512GB Space Gray",
    price: "₺79.999",
    location: "İzmir, Bornova",
    date: "Bugün",
    category: "Elektronik",
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",
  },
  {
    id: "7",
    title: "Sıfır Ayarında Yamaha R25 ABS",
    price: "₺315.000",
    location: "Bursa, Nilüfer",
    date: "Dün",
    category: "Motosiklet",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
  },
  {
    id: "8",
    title: "3+1 Lüks Residence Daire Havuzlu Site",
    price: "₺5.450.000",
    location: "Antalya, Konyaaltı",
    date: "2 Gün Önce",
    category: "Gayrimenkul",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
  },
  {
    id: "9",
    title: "PlayStation 5 Slim + 2 Kol + FIFA 26",
    price: "₺32.500",
    location: "Samsun, Atakum",
    date: "Bugün",
    category: "Oyun",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
  },
  {
    id: "10",
    title: "CAT 320D Ekskavatör Temiz Kullanılmış",
    price: "₺3.850.000",
    location: "Gaziantep, Şehitkamil",
    date: "3 Gün Önce",
    category: "İş Makineleri",
    image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=800",
  },
];
export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredListings = useMemo(() => {
    return LISTINGS.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Hepsi" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const renderListing = ({ item }: { item: Listing }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => Alert.alert("İlan", item.title)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.imageOverlay}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>

          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text numberOfLines={2} style={styles.cardTitle}>
          {item.title}
        </Text>

        <Text style={styles.price}>{item.price}</Text>

        <View style={styles.cardFooter}>
          <Text numberOfLines={1} style={styles.location}>
            📍 {item.location}
          </Text>

          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {showMenu && (
        <View style={styles.drawerOverlay}>
          <SafeAreaView style={styles.drawerContent}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerLogo}>Menü</Text>

              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* AUTH */}
              <View style={styles.authContainer}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/loginscreen");
                  }}
                >
                  <Text style={styles.loginBtnText}>Giriş Yap</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.registerBtn}
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/registerscreen");
                  }}
                >
                  <Text style={styles.registerBtnText}>Üye Ol</Text>
                </TouchableOpacity>
              </View>

              {MENU_SECTIONS.map((section, idx) => (
                <View key={idx} style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>

                  {section.items.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.menuItem}
                      onPress={() => {
                        if (item.route) {
                          setShowMenu(false);
                          router.push(item.route as any);
                        }
                      }}
                    >
                      <View style={styles.menuItemLeft}>
                        <Text style={styles.itemIcon}>{item.icon}</Text>

                        <Text style={styles.itemLabel}>{item.label}</Text>
                      </View>

                      {item.type === "toggle" ? (
                        <Switch
                          value={isDarkMode}
                          onValueChange={setIsDarkMode}
                          trackColor={{
                            false: "#E2E8F0",
                            true: "#3B82F6",
                          }}
                        />
                      ) : item.type === "lang" ? (
                        <View style={styles.langBadge}>
                          <Text style={styles.langText}>{item.value}</Text>
                        </View>
                      ) : (
                        <Text style={styles.arrow}>›</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setShowMenu(true)}
            >
              <View style={styles.menuLine} />
              <View style={[styles.menuLine, { width: 16 }]} />
              <View style={styles.menuLine} />
            </TouchableOpacity>

            <Text style={styles.logo}>
              İlan<Text style={styles.logoBold}>Pro</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/profilescreen")}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
              }}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="İlan ara..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleMain}>Vitrin İlanları</Text>

          <Text style={styles.resultCount}>{filteredListings.length} ilan</Text>
        </View>

        <FlatList
          data={filteredListings}
          keyExtractor={(item) => item.id}
          renderItem={renderListing}
          numColumns={2}
          columnWrapperStyle={styles.listGrid}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginRight: 15,
  },

  menuLine: {
    width: 22,
    height: 2.5,
    backgroundColor: "#111827",
    borderRadius: 2,
    marginVertical: 2,
  },

  logo: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
  },

  logoBold: {
    fontWeight: "800",
    color: "#3B82F6",
  },

  profileButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: "hidden",
  },

  profileAvatar: {
    width: "100%",
    height: "100%",
  },

  searchWrapper: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
  },

  categoryContainer: {
    paddingBottom: 20,
  },

  categoryButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  categoryButtonActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },

  categoryText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 13,
  },

  categoryTextActive: {
    color: "#FFFFFF",
  },

  sectionHeader: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sectionTitleMain: {
    fontSize: 18,
    fontWeight: "700",
  },

  resultCount: {
    color: "#6B7280",
  },

  listGrid: {
    justifyContent: "space-between",
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  imageContainer: {
    height: 110,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: "700",
  },

  favoriteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  favoriteIcon: {
    color: "#EF4444",
  },

  cardContent: {
    padding: 10,
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: "600",
    height: 34,
  },

  price: {
    fontSize: 15,
    fontWeight: "800",
    color: "#3B82F6",
    marginTop: 4,
  },

  cardFooter: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: "#F3F4F6",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  location: {
    fontSize: 9,
    color: "#6B7280",
    flex: 1,
  },

  date: {
    fontSize: 9,
    color: "#9CA3AF",
  },

  drawerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },

  drawerContent: {
    width: "85%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },

  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  drawerLogo: {
    fontSize: 18,
    fontWeight: "800",
  },

  closeIcon: {
    fontSize: 20,
  },

  authContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#F8FAFC",
  },

  loginBtn: {
    flex: 1,
    height: 40,
    backgroundColor: "#1E293B",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  loginBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  registerBtn: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  registerBtnText: {
    color: "#1E293B",
    fontWeight: "700",
  },

  sectionContainer: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },

  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemIcon: {
    fontSize: 18,
    marginRight: 12,
  },

  itemLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  arrow: {
    fontSize: 18,
    color: "#CBD5E1",
  },

  langBadge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 6,
    borderRadius: 4,
  },

  langText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
});
