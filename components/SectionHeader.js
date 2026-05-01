import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../constants/theme";

export default function SectionHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text
  },
  subtitle: {
    marginTop: 4,
    color: colors.mutedText,
    fontSize: 13
  }
});
