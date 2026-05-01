import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { colors, radius, spacing } from "../constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - spacing.xl * 2;
const SNAP_SIZE = CARD_WIDTH + spacing.md;

function Dot({ active }) {
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration: 220 });
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [8, 22]),
    opacity: interpolate(progress.value, [0, 1], [0.4, 1])
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export default function BannerCarousel({ offers }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % offers.length;
      scrollRef.current?.scrollTo({ x: nextIndex * SNAP_SIZE, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex, offers.length]);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={SNAP_SIZE}
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const next = Math.round(event.nativeEvent.contentOffset.x / SNAP_SIZE);
          setActiveIndex(next);
        }}
      >
        {offers.map((offer) => (
          <LinearGradient
            key={offer.id}
            colors={offer.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <Text style={styles.tag}>{offer.tag}</Text>
            <Text style={styles.title}>{offer.title}</Text>
            <Text style={styles.subtitle}>{offer.subtitle}</Text>
          </LinearGradient>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {offers.map((offer, index) => (
          <Dot key={offer.id} active={index === activeIndex} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: CARD_WIDTH,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginRight: spacing.md,
    minHeight: 180,
    justifyContent: "flex-end"
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.22)",
    color: colors.card,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginBottom: spacing.md,
    fontSize: 12,
    fontWeight: "800"
  },
  title: {
    color: colors.card,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 14,
    marginTop: spacing.xs
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md,
    gap: spacing.xs
  },
  dot: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.pill
  }
});
