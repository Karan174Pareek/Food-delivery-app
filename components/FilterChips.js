import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

export default function FilterChips({ filters, activeFilters, onToggle }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {filters.map((filter) => {
        const active = activeFilters.includes(filter.key);
        return (
          <Pressable
            key={filter.key}
            style={[styles.chip, active && styles.activeChip]}
            onPress={() => onToggle(filter.key)}
          >
            <Text style={[styles.text, active && styles.activeText]}>{filter.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.chip,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: "transparent"
  },
  activeChip: {
    backgroundColor: colors.primary
  },
  text: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 13
  },
  activeText: {
    color: colors.card
  }
});
