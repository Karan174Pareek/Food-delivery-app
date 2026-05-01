export const offers = [
  {
    id: "offer-1",
    title: "Flat 50% OFF",
    subtitle: "On your first three orders",
    tag: "WELCOME",
    colors: ["#FB923C", "#F97316"]
  },
  {
    id: "offer-2",
    title: "Free Delivery",
    subtitle: "Tonight on orders above Rs 299",
    tag: "HOT DEAL",
    colors: ["#FDBA74", "#FB7185"]
  },
  {
    id: "offer-3",
    title: "Biryani Festival",
    subtitle: "Up to Rs 150 off on top brands",
    tag: "LIMITED",
    colors: ["#F59E0B", "#EA580C"]
  }
];

export const categories = [
  { id: "cat-1", name: "Pizza", icon: "pizza" },
  { id: "cat-2", name: "Biryani", icon: "food" },
  { id: "cat-3", name: "Burgers", icon: "hamburger" },
  { id: "cat-4", name: "Desserts", icon: "ice-cream" },
  { id: "cat-5", name: "Healthy", icon: "food-apple" },
  { id: "cat-6", name: "South Indian", icon: "silverware-fork-knife" }
];

export const restaurants = [
  {
    id: "rest-1",
    name: "Spice Route Kitchen",
    rating: 4.7,
    cuisine: "North Indian, Biryani",
    deliveryTime: "24 mins",
    priceForTwo: "Rs 450 for two",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    isVeg: false,
    isFast: true,
    promoted: true,
    distance: "2.1 km",
    menu: {
      Starters: [
        { id: "m-1", name: "Tandoori Paneer Tikka", price: 220, veg: true },
        { id: "m-2", name: "Chicken Malai Kebab", price: 260, veg: false }
      ],
      "Main Course": [
        { id: "m-3", name: "Hyderabadi Chicken Biryani", price: 320, veg: false },
        { id: "m-4", name: "Paneer Butter Masala", price: 280, veg: true }
      ],
      Desserts: [{ id: "m-5", name: "Gulab Jamun", price: 120, veg: true }]
    }
  },
  {
    id: "rest-2",
    name: "Crust & Co.",
    rating: 4.5,
    cuisine: "Pizza, Italian",
    deliveryTime: "29 mins",
    priceForTwo: "Rs 600 for two",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    isVeg: true,
    isFast: false,
    promoted: false,
    distance: "3.2 km",
    menu: {
      Starters: [
        { id: "m-6", name: "Garlic Bread Supreme", price: 180, veg: true },
        { id: "m-7", name: "Cheesy Jalapeno Pops", price: 190, veg: true }
      ],
      "Main Course": [
        { id: "m-8", name: "Farmhouse Pizza", price: 340, veg: true },
        { id: "m-9", name: "Truffle Mushroom Pasta", price: 310, veg: true }
      ],
      Desserts: [{ id: "m-10", name: "Choco Lava Cup", price: 140, veg: true }]
    }
  },
  {
    id: "rest-3",
    name: "Burger District",
    rating: 4.3,
    cuisine: "Burgers, Fries, Shakes",
    deliveryTime: "18 mins",
    priceForTwo: "Rs 380 for two",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    isVeg: false,
    isFast: true,
    promoted: true,
    distance: "1.5 km",
    menu: {
      Starters: [
        { id: "m-11", name: "Loaded Peri Fries", price: 170, veg: true },
        { id: "m-12", name: "Crispy Chicken Bites", price: 210, veg: false }
      ],
      "Main Course": [
        { id: "m-13", name: "Classic Smash Burger", price: 260, veg: false },
        { id: "m-14", name: "Paneer Crunch Burger", price: 240, veg: true }
      ],
      Desserts: [{ id: "m-15", name: "Oreo Thick Shake", price: 160, veg: true }]
    }
  },
  {
    id: "rest-4",
    name: "Saffron Bowl",
    rating: 4.8,
    cuisine: "Healthy, Bowls, Salads",
    deliveryTime: "21 mins",
    priceForTwo: "Rs 520 for two",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    isVeg: true,
    isFast: true,
    promoted: false,
    distance: "2.8 km",
    menu: {
      Starters: [
        { id: "m-16", name: "Hummus Mezze", price: 190, veg: true },
        { id: "m-17", name: "Roasted Corn Cups", price: 160, veg: true }
      ],
      "Main Course": [
        { id: "m-18", name: "Teriyaki Tofu Bowl", price: 280, veg: true },
        { id: "m-19", name: "Harissa Paneer Bowl", price: 300, veg: true }
      ],
      Desserts: [{ id: "m-20", name: "Greek Yogurt Parfait", price: 150, veg: true }]
    }
  }
];

export const trackingStages = [
  { id: "prep", title: "Preparing", eta: "Chef is getting everything ready." },
  { id: "out", title: "Out for delivery", eta: "Your order is on the way." },
  { id: "done", title: "Delivered", eta: "Enjoy your meal." }
];

export const adminStats = [
  { id: "stat-1", label: "Total Orders", value: "1,284", trend: "+12.4%" },
  { id: "stat-2", label: "Revenue", value: "Rs 3.8L", trend: "+8.1%" },
  { id: "stat-3", label: "Active Riders", value: "46", trend: "+5 today" },
  { id: "stat-4", label: "Open Tickets", value: "18", trend: "-3.2%" }
];

export const adminOrders = [
  {
    id: "ORD-1024",
    customer: "Riya Sharma",
    restaurant: "Spice Route Kitchen",
    total: "Rs 620",
    status: "Preparing",
    payment: "UPI"
  },
  {
    id: "ORD-1025",
    customer: "Aman Das",
    restaurant: "Crust & Co.",
    total: "Rs 840",
    status: "Out for delivery",
    payment: "Card"
  },
  {
    id: "ORD-1026",
    customer: "Soham Roy",
    restaurant: "Burger District",
    total: "Rs 430",
    status: "Delivered",
    payment: "COD"
  }
];

export const adminRestaurants = [
  { id: "ADM-R1", name: "Spice Route Kitchen", status: "Live", commission: "22%", rating: "4.7" },
  { id: "ADM-R2", name: "Crust & Co.", status: "Busy", commission: "20%", rating: "4.5" },
  { id: "ADM-R3", name: "Saffron Bowl", status: "Live", commission: "18%", rating: "4.8" }
];

export const adminRiders = [
  { id: "RID-11", name: "Rahul Mondal", zone: "Siliguri North", status: "On delivery", earnings: "Rs 1,240" },
  { id: "RID-12", name: "Sayan Dey", zone: "Pradhan Nagar", status: "Available", earnings: "Rs 980" },
  { id: "RID-13", name: "Bikram Paul", zone: "Sevoke Road", status: "Offline", earnings: "Rs 760" }
];

export const adminCampaigns = [
  { id: "CMP-1", title: "Weekend Feast", audience: "All users", budget: "Rs 12,000", status: "Running" },
  { id: "CMP-2", title: "Siliguri New User Offer", audience: "New users", budget: "Rs 8,500", status: "Scheduled" },
  { id: "CMP-3", title: "Biryani Flash Sale", audience: "Returning users", budget: "Rs 6,000", status: "Draft" }
];
