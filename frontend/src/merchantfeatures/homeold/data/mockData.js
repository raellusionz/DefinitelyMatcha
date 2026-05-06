// data/mockData.js

export const ACTIVITIES = [
  { type: "order", label: "New order",       detail: "Priya S. — Classic Matcha Latte ×2",        time: "2 min ago",  amount: "$13.00" },
  { type: "order", label: "New order",       detail: "Wei L. — Matcha Croissant + Iced Lemonade", time: "18 min ago", amount: "$11.50" },
  { type: "low",   label: "Low stock alert", detail: "Matcha Tiramisu (6 left)",                  time: "1 hr ago",   amount: null },
  { type: "order", label: "New order",       detail: "Amirah R. — Matcha Tiramisu ×2",            time: "1 hr ago",   amount: "$18.00" },
  { type: "login", label: "Store opened",    detail: "for the day",                               time: "8:02 AM",    amount: null },
];

export const STATS = [
  { icon: "🛍️", value: "24",   name: "Orders today",  change: "↑ 12% vs yesterday", dir: "up" },
  { icon: "💰", value: "$318",  name: "Revenue today", change: "↑ 8% vs yesterday",  dir: "up" },
  { icon: "⭐", value: "4.9",   name: "Avg. rating",   change: "↑ from 4.8",          dir: "up" },
];

export const NAV_CARDS = [
  {
    id: "products",
    icon: "🛒",
    title: "Products",
    desc: "Manage your menu, update prices, and track stock levels.",
  },
  {
    id: "transactions",
    icon: "📋",
    title: "Transactions",
    desc: "View order history, refunds, and daily summaries.",
  },
];
