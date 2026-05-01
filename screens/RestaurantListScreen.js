import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import RestaurantCard from "../components/RestaurantCard";
import { restaurants } from "../data/mockData";
import { colors, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

const filters = [
  { key: "veg", label: "Veg" },
  { key: "rating", label: "Rating 4+" },
  { key: "fast", label: "Fast Delivery" }
];

export default function RestaurantListScreen({ navigation }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const { cartItems } = useApp();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFilter = (key) => {
    setActiveFilters((current) =>
      current.includes(key) ? current.filter((entry) => entry !== key) : [...current, key]
    );
  };

  const filteredRestaurants = useMemo(
    () =>
      restaurants.filter((restaurant) => {
        if (activeFilters.includes("veg") && !restaurant.isVeg) {
          return false;
        }
        if (activeFilters.includes("rating") && restaurant.rating < 4) {
          return false;
        }
        if (activeFilters.includes("fast") && !restaurant.isFast) {
          return false;
        }
        return true;
      }),
    [activeFilters]
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} />
          </Pressable>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>Restaurants</Text>
            <Text style={styles.subtitle}>Premium picks, sorted for speed and taste.</Text>
          </View>
          <Pressable style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
            <MaterialCommunityIcons name="cart-outline" size={22} color={colors.text} />
            {cartCount ? (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount > 99 ? "99+" : cartCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <SearchBar placeholder="Search by restaurant or cuisine" />

        <View style={styles.filters}>
          <FilterChips filters={filters} activeFilters={activeFilters} onToggle={toggleFilter} />
        </View>

        <Text style={styles.count}>{filteredRestaurants.length} restaurants found</Text>
        <View style={styles.metaStrip}>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipText}>{filteredRestaurants.length} Restaurants</Text>
          </View>
        </View>

        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            compact
            onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: restaurant.id })}
          />
        ))}
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
    alignItems: "flex-start",
    gap: spacing.md
  },
  headerTextWrap: {
    flex: 1
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.xs,
    marginBottom: spacing.lg
  },
  filters: {
    marginTop: spacing.lg
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
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
  count: {
    marginVertical: spacing.lg,
    color: colors.mutedText,
    fontWeight: "700"
  },
  metaStrip: {
    flexDirection: "row",
    marginBottom: spacing.md
  },
  metaChip: {
    backgroundColor: colors.chip,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 10
  },
  metaChipText: {
    color: colors.primaryDark,
    fontWeight: "800"
  }
});
