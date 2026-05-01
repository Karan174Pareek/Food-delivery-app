import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../constants/theme";

export default function RestaurantCard({ restaurant, onPress, compact = false }) {
  return (
    <Pressable style={[styles.card, compact && styles.compactCard]} onPress={onPress}>
      <ImageBackground source={{ uri: restaurant.image }} style={styles.image} imageStyle={styles.imageStyle}>
        {restaurant.promoted ? <Text style={styles.badge}>Pro Picks</Text> : null}
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View style={styles.ratingPill}>
            <MaterialCommunityIcons name="star" size={12} color={colors.card} />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{restaurant.deliveryTime}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.meta}>{restaurant.priceForTwo}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 274,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginRight: spacing.md,
    overflow: "hidden",
    ...shadow
  },
  compactCard: {
    width: "100%",
    marginRight: 0,
    marginBottom: spacing.md
  },
  image: {
    height: 170,
    justifyContent: "flex-start",
    padding: spacing.md
  },
  imageStyle: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.55)",
    color: colors.card,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.pill,
    fontSize: 12,
    fontWeight: "700"
  },
  content: {
    padding: spacing.md
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: "800"
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.pill
  },
  ratingText: {
    color: colors.card,
    fontWeight: "800",
    fontSize: 12
  },
  cuisine: {
    color: colors.mutedText,
    marginTop: spacing.xs,
    fontSize: 13
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm
  },
  meta: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 12
  },
  dot: {
    marginHorizontal: spacing.xs,
    color: colors.mutedText
  }
});
