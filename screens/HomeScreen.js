import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import BannerCarousel from "../components/BannerCarousel";
import CategoryPills from "../components/CategoryPills";
import RestaurantCard from "../components/RestaurantCard";
import SkeletonCard from "../components/SkeletonCard";
import { categories, offers, restaurants } from "../data/mockData";
import { colors, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const { selectedLocation, cartItems } = useApp();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable style={styles.locationRow} onPress={() => navigation.navigate("Location")}>
            <View>
              <Text style={styles.locationLabel}>Deliver to</Text>
              <View style={styles.locationValueRow}>
                <MaterialCommunityIcons name="map-marker" size={18} color={colors.primaryDark} />
                <Text style={styles.locationValue}>{selectedLocation?.title}</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="chevron-down" size={24} color={colors.text} />
          </Pressable>

          <Pressable style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
            <MaterialCommunityIcons name="cart-outline" size={22} color={colors.text} />
            {cartCount ? (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount > 99 ? "99+" : cartCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <SearchBar placeholder="Search for restaurants, food..." />

        <View style={styles.section}>
          <BannerCarousel offers={offers} />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Cravings, delivered" subtitle="Curated collections for tonight" />
          <CategoryPills categories={categories} />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Popular near you" subtitle="Fast delivery and premium packaging" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {loading
              ? [1, 2].map((entry) => <SkeletonCard key={entry} />)
              : restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onPress={() =>
                      navigation.navigate("RestaurantDetail", { restaurantId: restaurant.id })
                    }
                  />
                ))}
          </ScrollView>
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Want full restaurant discovery?</Text>
          <Text style={styles.ctaSubtitle}>Browse all restaurants with filters for veg, rating, and speed.</Text>
          <Text style={styles.ctaLink} onPress={() => navigation.navigate("RestaurantList")}>
            Explore restaurants
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  locationRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    position: "relative"
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  cartBadgeText: {
    color: colors.card,
    fontSize: 10,
    fontWeight: "900"
  },
  locationLabel: {
    color: colors.mutedText,
    fontSize: 12,
    marginBottom: 4
  },
  locationValueRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  locationValue: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 18,
    marginLeft: 6
  },
  section: {
    marginTop: spacing.xl
  },
  ctaCard: {
    marginTop: spacing.xl,
    padding: spacing.xl,
    borderRadius: 28,
    backgroundColor: colors.primaryDark
  },
  ctaTitle: {
    color: colors.card,
    fontSize: 20,
    fontWeight: "900"
  },
  ctaSubtitle: {
    color: "rgba(255,255,255,0.85)",
    marginTop: spacing.sm,
    lineHeight: 20
  },
  ctaLink: {
    color: colors.card,
    fontWeight: "900",
    marginTop: spacing.lg,
    fontSize: 15
  }
});
