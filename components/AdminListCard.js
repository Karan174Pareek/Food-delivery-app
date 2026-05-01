import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../constants/theme";

export default function AdminListCard({ title, subtitle, meta, badge }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  textWrap: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: 4,
    lineHeight: 20
  },
  meta: {
    color: colors.primaryDark,
    marginTop: spacing.sm,
    fontWeight: "700"
  },
  badge: {
    backgroundColor: colors.chip,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8
  },
  badgeText: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 12
  }
});
