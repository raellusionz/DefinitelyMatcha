
// ── Helpers ────────────────────────────────────────────────────────────────

export const isToday = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  return d.toDateString() === now.toDateString();
};

export const formatDateHeader = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return "Today";
  return d.toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString("en-SG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};


export const groupByDate = (txns) => {
  // 1. Sort transactions (latest first)
  const sorted = [...txns].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 2. Group them
  return sorted.reduce((acc, txn) => {
    const key = new Date(txn.date).toDateString();

    if (!acc[key]) {
      acc[key] = {
        label: formatDateHeader(txn.date),
        items: [],
      };
    }

    acc[key].items.push(txn);
    return acc;
  }, {});
};

// export const groupByDate = (txns) =>
//   txns.reduce((acc, txn) => {
//     const key = new Date(txn.date).toDateString();
//     if (!acc[key]) acc[key] = { label: formatDateHeader(txn.date), items: [] };
//     acc[key].items.push(txn);
//     return acc;
//   }, {});
