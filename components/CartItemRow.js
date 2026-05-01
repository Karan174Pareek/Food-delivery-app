import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

export default function CartItemRow({ item, onIncrement, onDecrement }) {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>{item.restaurantName}</Text>
        <Text style={styles.price}>Rs {item.price * item.quantity}</Text>
      </View>
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={onDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Pressable style={styles.button} onPress={onIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  info: {
    flex: 1
  },
  name: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 15
  },
  meta: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: spacing.xs
  },
  price: {
    color: colors.primaryDark,
    fontWeight: "800",
    marginTop: spacing.sm
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.chip,
    borderRadius: radius.pill,
    padding: 4
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: "800"
  },
  quantity: {
    minWidth: 28,
    textAlign: "center",
    color: colors.text,
    fontWeight: "800"
  }
});
