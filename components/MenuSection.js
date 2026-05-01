import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radius, shadow, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

function QuantityControl({ quantity, onAdd, onRemove }) {
  return (
    <View style={styles.quantityWrap}>
      <Pressable onPress={onRemove} style={styles.qtyButton}>
        <Text style={styles.qtySymbol}>-</Text>
      </Pressable>
      <Text style={styles.qtyCount}>{quantity}</Text>
      <Pressable onPress={onAdd} style={styles.qtyButton}>
        <Text style={styles.qtySymbol}>+</Text>
      </Pressable>
    </View>
  );
}

export default function MenuSection({ restaurantId, title, items }) {
  const { cartItems, addToCart, updateQuantity } = useApp();

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item) => {
        const cartItem = cartItems.find((entry) => entry.id === item.id);

        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.info}>
              <View style={[styles.dot, item.veg ? styles.veg : styles.nonVeg]} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Rs {item.price}</Text>
            </View>

            {cartItem ? (
              <QuantityControl
                quantity={cartItem.quantity}
                onAdd={() => addToCart(restaurantId, item)}
                onRemove={() => updateQuantity(item.id, -1)}
              />
            ) : (
              <Pressable style={styles.addButton} onPress={() => addToCart(restaurantId, item)}>
                <MaterialCommunityIcons name="plus" size={18} color={colors.card} />
                <Text style={styles.addText}>Add</Text>
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.xl
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.md
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...shadow
  },
  info: {
    flex: 1,
    paddingRight: spacing.md
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: spacing.sm
  },
  veg: {
    backgroundColor: colors.success
  },
  nonVeg: {
    backgroundColor: colors.primaryDark
  },
  name: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16
  },
  price: {
    color: colors.mutedText,
    marginTop: spacing.xs,
    fontWeight: "600"
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radius.pill
  },
  addText: {
    color: colors.card,
    fontWeight: "800"
  },
  quantityWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.chip,
    borderRadius: radius.pill,
    padding: 4
  },
  qtyButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center"
  },
  qtySymbol: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: "800"
  },
  qtyCount: {
    minWidth: 28,
    textAlign: "center",
    color: colors.text,
    fontWeight: "800"
  }
});
