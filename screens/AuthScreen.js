import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../components/Screen";
import { colors, radius, shadow, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function AuthScreen() {
  const { login } = useApp();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <Screen>
      <LinearGradient colors={["#FFF7ED", "#FFE7D1"]} style={styles.hero}>
        <Text style={styles.brand}>SwiftDrop</Text>
        <Text style={styles.title}>Food that arrives hot, fast, and beautifully packed.</Text>
        <Text style={styles.subtitle}>Sign in with your phone to unlock offers and live tracking.</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          style={styles.input}
          placeholderTextColor={colors.mutedText}
        />

        <Text style={styles.label}>OTP</Text>
        <TextInput
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter 4-digit OTP"
          keyboardType="number-pad"
          style={styles.input}
          placeholderTextColor={colors.mutedText}
        />

        <Pressable style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>

        <Text style={styles.note}>Demo flow only. Any number and OTP will work.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: spacing.xl,
    paddingVertical: 56,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl
  },
  brand: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 18,
    marginBottom: spacing.md
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    color: colors.text,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.md,
    fontSize: 15
  },
  card: {
    margin: spacing.xl,
    marginTop: -32,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadow
  },
  label: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.sm,
    marginTop: spacing.md
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: spacing.xl
  },
  buttonText: {
    color: colors.card,
    fontWeight: "900",
    fontSize: 15
  },
  note: {
    marginTop: spacing.md,
    textAlign: "center",
    color: colors.mutedText,
    fontSize: 12
  }
});
