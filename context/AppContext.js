import React, { createContext, useContext, useMemo, useState } from "react";
import { restaurants } from "../data/mockData";

const AppContext = createContext(null);
const defaultLocations = [
  {
    id: "loc-1",
    label: "Home",
    title: "Siliguri",
    address: "Hill Cart Road, Siliguri, West Bengal 734001"
  },
  {
    id: "loc-2",
    label: "Work",
    title: "Pradhan Nagar, Siliguri",
    address: "Sevoke Road, Pradhan Nagar, Siliguri, West Bengal 734003"
  }
];

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [activeOrder, setActiveOrder] = useState(null);
  const [savedLocations, setSavedLocations] = useState(defaultLocations);
  const [selectedLocationId, setSelectedLocationId] = useState(defaultLocations[0].id);

  const addToCart = (restaurantId, item) => {
    setCartItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }

      const restaurant = restaurants.find((entry) => entry.id === restaurantId);
      return [
        ...current,
        {
          ...item,
          quantity: 1,
          restaurantId,
          restaurantName: restaurant?.name ?? ""
        }
      ];
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode("");
  };

  const selectedLocation =
    savedLocations.find((location) => location.id === selectedLocationId) ?? savedLocations[0];

  const addLocation = ({ label, title, address }) => {
    const nextLocation = {
      id: `loc-${Date.now()}`,
      label: label.trim() || "Saved",
      title: title.trim(),
      address: address.trim()
    };

    setSavedLocations((current) => [...current, nextLocation]);
    setSelectedLocationId(nextLocation.id);
  };

  const selectLocation = (locationId) => {
    setSelectedLocationId(locationId);
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    clearCart();
    setActiveOrder(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 499 ? 0 : subtotal > 0 ? 39 : 0;
  const couponDiscount = couponCode.trim().toUpperCase() === "SWIFT50" ? 50 : 0;
  const taxes = Math.round(Math.max(subtotal - couponDiscount, 0) * 0.05);
  const total = Math.max(subtotal - couponDiscount, 0) + deliveryFee + taxes;

  const placeOrder = ({ paymentMethod, paymentLabel }) => {
    if (!cartItems.length) {
      return false;
    }

    setActiveOrder({
      id: `order-${Date.now()}`,
      items: cartItems,
      total,
      subtotal,
      deliveryFee,
      couponDiscount,
      taxes,
      paymentMethod,
      paymentLabel,
      location: selectedLocation,
      createdAt: new Date().toISOString()
    });
    clearCart();
    return true;
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
      cartItems,
      addToCart,
      updateQuantity,
      clearCart,
      couponCode,
      setCouponCode,
      subtotal,
      deliveryFee,
      couponDiscount,
      taxes,
      total,
      activeOrder,
      savedLocations,
      selectedLocation,
      addLocation,
      selectLocation,
      placeOrder
    }),
    [
      isLoggedIn,
      cartItems,
      couponCode,
      subtotal,
      deliveryFee,
      couponDiscount,
      taxes,
      total,
      activeOrder,
      savedLocations,
      selectedLocationId
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
