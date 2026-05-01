import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Screen from "../components/Screen";
import { trackingStages } from "../data/mockData";
import { colors, radius, shadow, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function OrderTrackingScreen() {
  const { activeOrder } = useApp();
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const first = setTimeout(() => setCurrentStage(1), 1600);
    const second = setTimeout(() => setCurrentStage(2), 3400);
    return () => {
      clearTimeout(first);
      clearTimeout(second);
    };
  }, []);

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Track your order</Text>
      <Text style={styles.subtitle}>
        {activeOrder ? `Order total Rs ${activeOrder.total}` : "Your delivery timeline updates here."}
      </Text>

      {activeOrder ? (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{activeOrder.location?.title}</Text>
          <Text style={styles.summaryText}>{activeOrder.location?.address}</Text>
          <Text style={styles.summaryText}>{activeOrder.paymentLabel}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        {trackingStages.map((stage, index) => {
          const reached = index <= currentStage;
          return (
            <Animated.View
              key={stage.id}
              entering={FadeInUp.delay(index * 180).springify()}
              style={styles.stageRow}
            >
              <View style={styles.timelineWrap}>
                <View style={[styles.dot, reached && styles.activeDot]} />
                {index < trackingStages.length - 1 ? (
                  <View style={[styles.line, reached && styles.activeLine]} />
                ) : null}
              </View>

              <View style={styles.stageContent}>
                <Text style={[styles.stageTitle, reached && styles.activeTitle]}>{stage.title}</Text>
                <Text style={styles.stageEta}>{stage.eta}</Text>
              </View>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.mapCard}>
        <Text style={styles.mapTitle}>Rider is 9 mins away</Text>
        <Text style={styles.mapText}>Live map is mocked here, but the UI is ready for real tracking integration.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: spacing.lg
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.xs
  },
  card: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadow
  },
  summaryCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadow
  },
  summaryTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 18
  },
  summaryText: {
    color: colors.mutedText,
    marginTop: spacing.xs,
    lineHeight: 20
  },
  stageRow: {
    flexDirection: "row"
  },
  timelineWrap: {
    alignItems: "center",
    marginRight: spacing.md
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.border
  },
  activeDot: {
    backgroundColor: colors.primary
  },
  line: {
    width: 3,
    flex: 1,
    minHeight: 58,
    backgroundColor: colors.border,
    marginVertical: 6,
    borderRadius: radius.pill
  },
  activeLine: {
    backgroundColor: colors.primary
  },
  stageContent: {
    flex: 1,
    paddingBottom: spacing.xl
  },
  stageTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 16
  },
  activeTitle: {
    color: colors.primaryDark
  },
  stageEta: {
    color: colors.mutedText,
    marginTop: spacing.xs,
    lineHeight: 20
  },
  mapCard: {
    marginTop: spacing.xl,
    borderRadius: radius.xl,
    padding: spacing.xl,
    backgroundColor: colors.primaryDark
  },
  mapTitle: {
    color: colors.card,
    fontWeight: "900",
    fontSize: 20
  },
  mapText: {
    color: "rgba(255,255,255,0.86)",
    marginTop: spacing.sm,
    lineHeight: 20
  }
});
