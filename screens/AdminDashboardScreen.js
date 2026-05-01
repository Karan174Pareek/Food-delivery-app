import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import SectionHeader from "../components/SectionHeader";
import AdminStatCard from "../components/AdminStatCard";
import AdminListCard from "../components/AdminListCard";
import {
  adminCampaigns,
  adminOrders,
  adminRestaurants,
  adminRiders,
  adminStats
} from "../data/mockData";
import { colors, radius, spacing } from "../constants/theme";

const shortcuts = [
  { key: "AdminOrders", label: "Orders" },
  { key: "AdminRestaurants", label: "Restaurants" },
  { key: "AdminRiders", label: "Riders" },
  { key: "AdminCampaigns", label: "Campaigns" }
];

export default function AdminDashboardScreen({ navigation }) {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Admin Panel</Text>
        <Text style={styles.title}>Operations dashboard</Text>
        <Text style={styles.subtitle}>
          Control orders, restaurants, riders, campaigns, and growth in one place.
        </Text>

        <View style={styles.shortcuts}>
          {shortcuts.map((item) => (
            <Pressable key={item.key} style={styles.shortcut} onPress={() => navigation.navigate(item.key)}>
              <Text style={styles.shortcutText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.statsGrid}>
          {adminStats.map((stat) => (
            <AdminStatCard key={stat.id} stat={stat} />
          ))}
        </View>

        <SectionHeader title="Live Orders" subtitle="Latest operational movement across the platform" />
        {adminOrders.slice(0, 2).map((order) => (
          <AdminListCard
            key={order.id}
            title={`${order.id} - ${order.customer}`}
            subtitle={order.restaurant}
            meta={`${order.total} - ${order.payment}`}
            badge={order.status}
          />
        ))}

        <SectionHeader title="Restaurant Health" subtitle="Top partner snapshot" />
        {adminRestaurants.slice(0, 2).map((restaurant) => (
          <AdminListCard
            key={restaurant.id}
            title={restaurant.name}
            subtitle={`Commission ${restaurant.commission} - Rating ${restaurant.rating}`}
            badge={restaurant.status}
          />
        ))}

        <SectionHeader title="Delivery Fleet" subtitle="Live partner availability" />
        {adminRiders.slice(0, 2).map((rider) => (
          <AdminListCard
            key={rider.id}
            title={rider.name}
            subtitle={rider.zone}
            meta={rider.earnings}
            badge={rider.status}
          />
        ))}

        <SectionHeader title="Campaign Snapshot" subtitle="Growth tools currently being managed" />
        {adminCampaigns.slice(0, 1).map((campaign) => (
          <AdminListCard
            key={campaign.id}
            title={campaign.title}
            subtitle={campaign.audience}
            meta={campaign.budget}
            badge={campaign.status}
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
  eyebrow: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 13
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    marginTop: spacing.sm
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.sm,
    lineHeight: 22
  },
  shortcuts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: spacing.xl,
    marginBottom: spacing.md
  },
  shortcut: {
    width: "48%",
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md
  },
  shortcutText: {
    color: colors.card,
    fontWeight: "800",
    fontSize: 15
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.lg
  }
});
