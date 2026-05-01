import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../components/Screen";
import PriceRow from "../components/PriceRow";
import { colors, radius, shadow, spacing } from "../constants/theme";
import { useApp } from "../context/AppContext";

const paymentOptions = [
  { key: "upi", title: "UPI", subtitle: "Pay instantly with any UPI app" },
  { key: "card", title: "Card", subtitle: "Credit or debit card" },
  { key: "cod", title: "Cash on Delivery", subtitle: "Pay at your doorstep" }
];

export default function PaymentScreen({ navigation }) {
  const {
    total,
    subtotal,
    deliveryFee,
    couponDiscount,
    taxes,
    selectedLocation,
    placeOrder
  } = useApp();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handlePay = () => {
    let paymentLabel = "Cash on Delivery";

    if (paymentMethod === "upi") {
      if (!upiId.trim()) {
        return;
      }
      paymentLabel = `UPI - ${upiId.trim()}`;
    }

    if (paymentMethod === "card") {
      if (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        return;
      }
      paymentLabel = `Card - **** ${cardNumber.trim().slice(-4)}`;
    }

    const placed = placeOrder({ paymentMethod, paymentLabel });
    if (placed) {
      navigation.replace("OrderTracking");
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Review address, choose payment, and place the order.</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivering to</Text>
          <Text style={styles.locationTitle}>{selectedLocation?.title}</Text>
          <Text style={styles.locationAddress}>{selectedLocation?.address}</Text>
          <Text style={styles.changeLink} onPress={() => navigation.navigate("Location")}>
            Change location
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Choose payment method</Text>
          {paymentOptions.map((option) => {
            const active = option.key === paymentMethod;
            return (
              <Pressable
                key={option.key}
                style={[styles.optionCard, active && styles.optionCardActive]}
                onPress={() => setPaymentMethod(option.key)}
              >
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </Pressable>
            );
          })}

          {paymentMethod === "upi" ? (
            <TextInput
              value={upiId}
              onChangeText={setUpiId}
              placeholder="Enter UPI ID"
              placeholderTextColor={colors.mutedText}
              style={styles.input}
            />
          ) : null}

          {paymentMethod === "card" ? (
            <>
              <TextInput
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="Card number"
                placeholderTextColor={colors.mutedText}
                style={styles.input}
                keyboardType="number-pad"
              />
              <TextInput
                value={cardName}
                onChangeText={setCardName}
                placeholder="Name on card"
                placeholderTextColor={colors.mutedText}
                style={styles.input}
              />
              <View style={styles.inlineRow}>
                <TextInput
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  placeholder="MM/YY"
                  placeholderTextColor={colors.mutedText}
                  style={[styles.input, styles.inlineInput]}
                />
                <TextInput
                  value={cardCvv}
                  onChangeText={setCardCvv}
                  placeholder="CVV"
                  placeholderTextColor={colors.mutedText}
                  style={[styles.input, styles.inlineInput]}
                  keyboardType="number-pad"
                />
              </View>
            </>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment summary</Text>
          <PriceRow label="Subtotal" value={`Rs ${subtotal}`} />
          <PriceRow label="Delivery fee" value={deliveryFee ? `Rs ${deliveryFee}` : "Free"} />
          <PriceRow label="Coupon discount" value={`- Rs ${couponDiscount}`} />
          <PriceRow label="Taxes" value={`Rs ${taxes}`} />
          <View style={styles.divider} />
          <PriceRow
            label={paymentMethod === "cod" ? "Pay on delivery" : "Pay now"}
            value={`Rs ${total}`}
            emphasis
          />
        </View>

        <Pressable style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payText}>
            {paymentMethod === "cod" ? `Place order - Rs ${total}` : `Pay & place order - Rs ${total}`}
          </Text>
        </Pressable>
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
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 17,
    marginBottom: spacing.md
  },
  locationTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 18
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
  optionCard: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "transparent"
  },
  optionCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.accent
  },
  optionTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 16
  },
  optionSubtitle: {
    color: colors.mutedText,
    marginTop: spacing.xs
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text,
    marginTop: spacing.sm
  },
  inlineRow: {
    flexDirection: "row",
    gap: spacing.md
  },
  inlineInput: {
    flex: 1
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginVertical: spacing.sm
  },
  payButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 17,
    alignItems: "center"
  },
  payText: {
    color: colors.card,
    fontWeight: "900",
    fontSize: 15
  }
});
