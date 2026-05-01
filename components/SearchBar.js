import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../constants/theme";

export default function SearchBar({ placeholder }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={22} color={colors.mutedText} />
      <Text style={styles.text}>{placeholder}</Text>
      <MaterialCommunityIcons name="microphone-outline" size={20} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
    gap: spacing.sm,
    ...shadow
  },
  text: {
    flex: 1,
    color: colors.mutedText,
    fontSize: 14
  }
});
