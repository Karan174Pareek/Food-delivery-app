import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

export default function SkeletonCard() {
  const shimmer = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 0.8,
          duration: 700,
          useNativeDriver: true
        }),
        Animated.timing(shimmer, {
          toValue: 0.35,
          duration: 700,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [shimmer]);

  return (
    <Animated.View style={[styles.card, { opacity: shimmer }]}>
      <View style={styles.image} />
      <View style={styles.lineLarge} />
      <View style={styles.lineMedium} />
      <View style={styles.lineSmall} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginRight: spacing.md
  },
  image: {
    height: 140,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    marginBottom: spacing.md
  },
  lineLarge: {
    height: 16,
    width: "70%",
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    marginBottom: spacing.sm
  },
  lineMedium: {
    height: 12,
    width: "45%",
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    marginBottom: spacing.sm
  },
  lineSmall: {
    height: 12,
    width: "55%",
    backgroundColor: colors.accent,
    borderRadius: radius.pill
  }
});
