import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import AdminListCard from "../components/AdminListCard";
import { adminRiders } from "../data/mockData";
import { colors, spacing } from "../constants/theme";

export default function AdminRidersScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Delivery Partners</Text>
        <Text style={styles.subtitle}>Watch rider availability, zones, and earnings health.</Text>
        {adminRiders.map((rider) => (
          <AdminListCard
            key={rider.id}
            title={rider.name}
            subtitle={rider.zone}
            meta={rider.earnings}
            badge={rider.status}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.xs,
    marginBottom: spacing.lg
  }
});
