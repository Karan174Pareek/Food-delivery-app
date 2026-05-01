import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import AdminListCard from "../components/AdminListCard";
import { adminOrders } from "../data/mockData";
import { colors, spacing } from "../constants/theme";

export default function AdminOrdersScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Orders Management</Text>
        <Text style={styles.subtitle}>Track active and completed orders across the platform.</Text>
        {adminOrders.map((order) => (
          <AdminListCard
            key={order.id}
            title={`${order.id} • ${order.customer}`}
            subtitle={order.restaurant}
            meta={`${order.total} • ${order.payment}`}
            badge={order.status}
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
