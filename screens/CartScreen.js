import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../components/Screen";
import CartItemRow from "../components/CartItemRow";
import PriceRow from "../components/PriceRow";
import { colors, radius, shadow, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function CartScreen({ navigation }) {
  const {
    cartItems,
    updateQuantity,
    couponCode,
    setCouponCode,
    subtotal,
    deliveryFee,
    couponDiscount,
    taxes,
    total,
    selectedLocation
  } = useApp();

  const handleCheckout = () => {
    if (!cartItems.length) {
      return;
    }

    navigation.navigate("Payment");
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your cart</Text>
        <Text style={styles.subtitle}>Everything looks delicious.</Text>

        {!cartItems.length ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Cart is empty</Text>
            <Text style={styles.emptySubtitle}>Add dishes from your favorite restaurant to continue.</Text>
          </View>
        ) : (
          <>
            <View style={styles.deliveryCard}>
              <Text style={styles.sectionTitle}>Delivering to</Text>
              <Text style={styles.locationTitle}>{selectedLocation?.title}</Text>
              <Text style={styles.locationAddress}>{selectedLocation?.address}</Text>
              <Text style={styles.changeLink} onPress={() => navigation.navigate("Location")}>
                Change location
              </Text>
            </View>

            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrement={() => updateQuantity(item.id, 1)}
                onDecrement={() => updateQuantity(item.id, -1)}
              />
            ))}

            <View style={styles.couponCard}>
              <Text style={styles.sectionTitle}>Apply coupon</Text>
              <TextInput
                value={couponCode}
                onChangeText={setCouponCode}
                placeholder="Try SWIFT50"
                placeholderTextColor={colors.mutedText}
                style={styles.input}
              />
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.sectionTitle}>Bill details</Text>
              <PriceRow label="Subtotal" value={`Rs ${subtotal}`} />
              <PriceRow label="Delivery fee" value={deliveryFee ? `Rs ${deliveryFee}` : "Free"} />
              <PriceRow label="Coupon discount" value={`- Rs ${couponDiscount}`} />
              <PriceRow label="Taxes" value={`Rs ${taxes}`} />
              <View style={styles.divider} />
              <PriceRow label="To pay" value={`Rs ${total}`} emphasis />
            </View>

            <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </Pressable>
          </>
        )}
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
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadow
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 20
  },
  emptySubtitle: {
    color: colors.mutedText,
    marginTop: spacing.sm
  },
  couponCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow
  },
  deliveryCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadow
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    ...shadow
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 16,
    marginBottom: spacing.md
  },
  locationTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 17
  },
  locationAddress: {
    color: colors.mutedText,
    lineHeight: 20,
    marginTop: spacing.xs
  },
  changeLink: {
    color: colors.primaryDark,
    fontWeight: "800",
    marginTop: spacing.md
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginVertical: spacing.sm
  },
  checkoutButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 17,
    alignItems: "center"
  },
  checkoutText: {
    color: colors.card,
    fontWeight: "900",
    fontSize: 15
  }
});
