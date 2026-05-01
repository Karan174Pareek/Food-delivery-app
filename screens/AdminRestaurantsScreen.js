import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import AdminListCard from "../components/AdminListCard";
import { adminRestaurants } from "../data/mockData";
import { colors, spacing } from "../constants/theme";

export default function AdminRestaurantsScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Restaurants Management</Text>
        <Text style={styles.subtitle}>Monitor partner status, commission, and storefront quality.</Text>
        {adminRestaurants.map((restaurant) => (
          <AdminListCard
            key={restaurant.id}
            title={restaurant.name}
            subtitle={`Commission ${restaurant.commission} • Rating ${restaurant.rating}`}
            meta={`Restaurant ID ${restaurant.id}`}
            badge={restaurant.status}
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
