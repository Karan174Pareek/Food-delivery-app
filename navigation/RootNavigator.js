import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useApp } from "../context/AppContext";
import HomeScreen from "../screens/HomeScreen";
import RestaurantListScreen from "../screens/RestaurantListScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/AuthScreen";
import OrderTrackingScreen from "../screens/OrderTrackingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import LocationScreen from "../screens/LocationScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import AdminOrdersScreen from "../screens/AdminOrdersScreen";
import AdminRestaurantsScreen from "../screens/AdminRestaurantsScreen";
import AdminRidersScreen from "../screens/AdminRidersScreen";
import AdminCampaignsScreen from "../screens/AdminCampaignsScreen";
import { colors } from "../constants/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { cartItems } = useApp();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: 74,
          paddingTop: 8,
          paddingBottom: 12
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home-variant",
            Restaurants: "storefront-outline",
            Cart: "cart-outline",
            Profile: "account-circle-outline"
          };
          return (
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name={icons[route.name]} size={size} color={color} />
              {route.name === "Cart" && cartCount ? (
                <TabBadge count={cartCount} />
              ) : null}
            </View>
          );
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantListScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function TabBadge({ count }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 99 ? "99+" : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center"
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  badgeText: {
    color: colors.card,
    fontSize: 10,
    fontWeight: "900"
  }
});

export default function RootNavigator() {
  const { isLoggedIn } = useApp();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
    >
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
          <Stack.Screen name="AdminOrders" component={AdminOrdersScreen} />
          <Stack.Screen name="AdminRestaurants" component={AdminRestaurantsScreen} />
          <Stack.Screen name="AdminRiders" component={AdminRidersScreen} />
          <Stack.Screen name="AdminCampaigns" component={AdminCampaignsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
