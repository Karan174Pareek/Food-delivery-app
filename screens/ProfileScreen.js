import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import { colors, radius, shadow, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function ProfileScreen({ navigation }) {
  const { activeOrder, logout, selectedLocation } = useApp();

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Manage your account, offers, and deliveries.</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Karan</Text>
        <Text style={styles.meta}>swiftdrop.user@example.com</Text>
        <Text style={styles.meta}>+91 98765 43210</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Default location</Text>
        <Text style={styles.meta}>{selectedLocation?.title}</Text>
        <Text style={styles.meta}>{selectedLocation?.address}</Text>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Location")}>
          <Text style={styles.secondaryText}>Change location</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current order</Text>
        <Text style={styles.meta}>
          {activeOrder ? `Order live. Total paid Rs ${activeOrder.total}` : "No active order right now."}
        </Text>
        {activeOrder ? <Text style={styles.meta}>{activeOrder.paymentLabel}</Text> : null}
        {activeOrder ? (
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("OrderTracking")}>
            <Text style={styles.secondaryText}>Track order</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Operations & Admin</Text>
        <Text style={styles.meta}>Open the internal admin dashboard to manage orders, restaurants, riders, and campaigns.</Text>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("AdminDashboard")}>
          <Text style={styles.secondaryText}>Open admin panel</Text>
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
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
    marginTop: spacing.xs,
    marginBottom: spacing.lg
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadow
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  meta: {
    color: colors.mutedText,
    marginTop: spacing.sm,
    lineHeight: 20
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 18
  },
  secondaryButton: {
    marginTop: spacing.lg,
    alignSelf: "flex-start",
    backgroundColor: colors.chip,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12
  },
  secondaryText: {
    color: colors.primaryDark,
    fontWeight: "800"
  },
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: "center"
  },
  logoutText: {
    color: colors.card,
    fontWeight: "900"
  }
});
