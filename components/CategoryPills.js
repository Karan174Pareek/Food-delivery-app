import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../constants/theme";

export default function CategoryPills({ categories }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <View key={category.id} style={styles.pill}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name={category.icon} size={20} color={colors.primaryDark} />
          </View>
          <Text style={styles.label}>{category.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pill: {
    width: 94,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    marginRight: spacing.md,
    alignItems: "center",
    ...shadow
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
    marginBottom: spacing.sm
  },
  label: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 13
  }
});
