import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../constants/theme";

export default function PriceRow({ label, value, emphasis = false }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, emphasis && styles.emphasis]}>{label}</Text>
      <Text style={[styles.value, emphasis && styles.emphasis]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm
  },
  label: {
    color: colors.mutedText,
    fontSize: 14
  },
  value: {
    color: colors.text,
    fontWeight: "700"
  },
  emphasis: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  }
});
