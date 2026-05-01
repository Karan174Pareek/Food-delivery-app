import React from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import MenuSection from "../components/MenuSection";
import { restaurants } from "../data/mockData";
import { colors, radius, shadow, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function RestaurantDetailScreen({ navigation, route }) {
  const { restaurantId } = route.params;
  const restaurant = restaurants.find((entry) => entry.id === restaurantId);
  const { cartItems } = useApp();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemCount = Object.values(restaurant?.menu ?? {}).flat().length;

  if (!restaurant) {
    return null;
  }

  return (
    <Screen>
      <View style={styles.headerBar}>
        <Pressable style={styles.headerButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} />
        </Pressable>

        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>{restaurant.name}</Text>
          <Text style={styles.headerSubtitle}>{itemCount} food items</Text>
        </View>

        <Pressable
          style={styles.headerButton}
          onPress={() => navigation.navigate("MainTabs", { screen: "Cart" })}
        >
          <MaterialCommunityIcons name="cart-outline" size={22} color={colors.text} />
          {cartCount ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: restaurant.image }} style={styles.hero}>
          <View style={styles.overlayCard}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaPill}>
                <MaterialCommunityIcons name="star" size={14} color={colors.card} />
                <Text style={styles.metaPillText}>{restaurant.rating}</Text>
              </View>
              <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
              <Text style={styles.metaText}>{restaurant.priceForTwo}</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          {Object.entries(restaurant.menu).map(([section, items]) => (
            <MenuSection key={section} restaurantId={restaurant.id} title={section} items={items} />
          ))}
        </View>
      </ScrollView>

      {cartCount ? (
        <Pressable
          style={styles.floatingBar}
          onPress={() => navigation.navigate("MainTabs", { screen: "Cart" })}
        >
          <Text style={styles.floatingText}>{cartCount} items added</Text>
          <Text style={styles.floatingSubtext}>Tap here to open cart and checkout</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.background
  },
  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    ...shadow
  },
  headerTitles: {
    flex: 1
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  headerSubtitle: {
    color: colors.mutedText,
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700"
  },
  hero: {
    height: 300,
    justifyContent: "flex-end"
  },
  cartBadge: {
    position: "absolute",
    top: -3,
    right: -3,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4
  },
  cartBadgeText: {
    color: colors.card,
    fontSize: 11,
    fontWeight: "900"
  },
  overlayCard: {
    margin: spacing.lg,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: radius.xl,
    padding: spacing.lg
  },
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900"
  },
  cuisine: {
    color: colors.mutedText,
    marginTop: spacing.xs
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
    flexWrap: "wrap"
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.success
  },
  metaPillText: {
    color: colors.card,
    fontWeight: "800"
  },
  metaText: {
    color: colors.text,
    fontWeight: "700"
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 110
  },
  floatingBar: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.md
  },
  floatingText: {
    color: colors.card,
    fontWeight: "900",
    fontSize: 15
  },
  floatingSubtext: {
    color: "rgba(255,255,255,0.82)",
    marginTop: 4
  }
});
