import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../constants/theme";

export default function AdminStatCard({ stat }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{stat.label}</Text>
      <Text style={styles.value}>{stat.value}</Text>
      <Text style={styles.trend}>{stat.trend}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow
  },
  label: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "700"
  },
  value: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginTop: spacing.sm
  },
  trend: {
    color: colors.primaryDark,
    fontWeight: "800",
    marginTop: spacing.sm
  }
});
