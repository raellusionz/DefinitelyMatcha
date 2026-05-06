// utils/helpers.js

export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function formatDate() {
  return new Date().toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function getRevenueChangeText (todayRevenue, yesterdayRevenue) {
  if (yesterdayRevenue === 0) {
    if (todayRevenue === 0) return "No change vs yesterday";
    return "New revenue today";
  }

  const difference = todayRevenue - yesterdayRevenue;
  const percentChange = (difference / yesterdayRevenue) * 100;

  if (difference > 0) {
    return `↑ ${percentChange.toFixed(0)}% vs yesterday`;
  }

  if (difference < 0) {
    return `↓ ${Math.abs(percentChange).toFixed(0)}% vs yesterday`;
  }

  return "No change vs yesterday";
};

export const getSingaporeDateString = (date = new Date()) => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
