import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../components/Screen";
import { colors, radius, shadow, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function LocationScreen({ navigation }) {
  const { savedLocations, selectedLocation, selectLocation, addLocation } = useApp();
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    if (!title.trim() || !address.trim()) {
      return;
    }

    addLocation({ label, title, address });
    setLabel("");
    setTitle("");
    setAddress("");
    navigation.goBack();
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} />
          </Pressable>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>Choose delivery location</Text>
            <Text style={styles.subtitle}>Switch addresses or add a new one for this order.</Text>
          </View>
        </View>

        {savedLocations.map((location) => {
          const active = selectedLocation?.id === location.id;
          return (
            <Pressable
              key={location.id}
              style={[styles.locationCard, active && styles.locationCardActive]}
              onPress={() => {
                selectLocation(location.id);
                navigation.goBack();
              }}
            >
              <View style={styles.locationRow}>
                <Text style={[styles.locationLabel, active && styles.locationLabelActive]}>
                  {location.label}
                </Text>
                {active ? <Text style={styles.selectedTag}>Selected</Text> : null}
              </View>
              <Text style={styles.locationTitle}>{location.title}</Text>
              <Text style={styles.locationAddress}>{location.address}</Text>
            </Pressable>
          );
        })}

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Add new address</Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder="Label (Home, Work, Hostel)"
            placeholderTextColor={colors.mutedText}
            style={styles.input}
          />
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Area or locality"
            placeholderTextColor={colors.mutedText}
            style={styles.input}
          />
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Full address"
            placeholderTextColor={colors.mutedText}
            style={[styles.input, styles.textArea]}
            multiline
          />
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save location</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.lg
  },
  headerTextWrap: {
    flex: 1
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    ...shadow
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.xs,
    marginBottom: 0
  },
  locationCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "transparent",
    ...shadow
  },
  locationCardActive: {
    borderColor: colors.primary
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  locationLabel: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 14
  },
  locationLabelActive: {
    color: colors.primary
  },
  selectedTag: {
    color: colors.card,
    backgroundColor: colors.primary,
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.pill,
    fontSize: 12,
    fontWeight: "800"
  },
  locationTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 18,
    marginTop: spacing.sm
  },
  locationAddress: {
    color: colors.mutedText,
    lineHeight: 20,
    marginTop: spacing.xs
  },
  formCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadow
  },
  formTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 18,
    marginBottom: spacing.md
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text,
    marginBottom: spacing.md
  },
  textArea: {
    minHeight: 92,
    textAlignVertical: "top"
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: "center"
  },
  saveText: {
    color: colors.card,
    fontWeight: "900"
  }
});
