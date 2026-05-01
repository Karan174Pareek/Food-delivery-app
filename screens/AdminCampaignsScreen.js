import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import AdminListCard from "../components/AdminListCard";
import { adminCampaigns } from "../data/mockData";
import { colors, spacing } from "../constants/theme";

export default function AdminCampaignsScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Campaigns & Growth</Text>
        <Text style={styles.subtitle}>Manage promo pushes, user cohorts, and marketing spend.</Text>
        {adminCampaigns.map((campaign) => (
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
