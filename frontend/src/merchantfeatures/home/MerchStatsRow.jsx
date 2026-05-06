// components/StatsRow.jsx
// import { STATS } from "./mockData";
import merchTransactionService from '../transaction/MerchTransactionService'
import { useEffect, useState } from "react";
import {getRevenueChangeText, getSingaporeDateString, getReviewChangeText} from "./MerchHelpers";
import reviewService from '../../api/reviewService';

const changeClasses = {
  up: "text-[#5a8f63]",
  down: "text-[#c07060]",
};

function MerchStatsRow({ merchant_id }) {
  
  const [ordersToday, setOrdersToday] = useState({
    icon: "🛍️", 
    value: "0",   
    name: "Orders today",  
    change: "Loading...", 
    dir: "up"
  })
  const [revenueToday, setRevenueToday] = useState({
    icon: "💰",
    value: "$0.00",
    name: "Revenue today",
    change: "Loading...",
    dir: "up",
  });
  const [avgRating, setAvgRating] = useState({
    icon: "⭐",
    value: "0.00",
    name: "Avg. rating",
    change: "Loading...",
    dir: "up",
  });
  const stats = [ordersToday, revenueToday, avgRating];

  const fetchRevenue = async() => {
    try {
      const fetchedRevenue = await merchTransactionService.getDailyRevenueByMerchantPg(merchant_id)
      // console.log(fetchedRevenue)
      

      const dailyStats = fetchedRevenue.data.dailyRevenue|| []
      // console.log(dailyStats)
      
      const getStatsForDate = (dailyStats, targetDate) => {
        const target = getSingaporeDateString(targetDate);
        const row = dailyStats.find((item) => {
          return item.revenue_date === target;
        });

        return {
          revenue: row ? Number(row.daily_revenue) : 0,
          orders: row ? Number(row.daily_orders) : 0,
        };
      };

      const todayDate = new Date();
      const yesterdayDate = new Date();
      yesterdayDate.setDate(todayDate.getDate() - 1)

      const todayStats = getStatsForDate(dailyStats, todayDate);
      const yesterdayStats = getStatsForDate(dailyStats, yesterdayDate);

      const revenueChangeText = getRevenueChangeText(
        todayStats.revenue, 
        yesterdayStats.revenue
      );
      const revenueDirection = 
        todayStats.revenue >= yesterdayStats.revenue ? "up" : "down";

      const orderChangeText = getRevenueChangeText(
        todayStats.orders,
        yesterdayStats.orders
      );

      const orderDirection =
        todayStats.orders >= yesterdayStats.orders ? "up" : "down";

      setRevenueToday({
        icon: "💰",
        value: `$${todayStats.revenue.toFixed(2)}`,
        name: "Revenue today",
        change: revenueChangeText,
        dir: revenueDirection,
      });

      setOrdersToday({
        icon: "🛍️",
        value: String(todayStats.orders),
        name: "Orders today",
        change: orderChangeText,
        dir: orderDirection,
      });

    } catch(error) {
      console.error("Failed to fetch revenue:", error);

      setRevenueToday({
        icon: "💰",
        value: "$0.00",
        name: "Revenue today",
        change: "Failed to load",
        dir: "down",
      })

      setOrdersToday({
        icon: "🛍️",
        value: "0",
        name: "Orders today",
        change: "Failed to load",
        dir: "down",
      });
    }
  }

  const fetchReviews = async () => {
    try {
      const fetchedReviews =
        await reviewService.getMerchantAverageReviewPg(merchant_id);

      const ratingStats = fetchedReviews.data.ratingStats;

      console.log("Review Data:", ratingStats);

      const overallAvgRating = ratingStats.overall_avg_rating;
      const todayAvgRating = ratingStats.today_avg_rating;
      const yesterdayAvgRating = ratingStats.yesterday_avg_rating;
      const ratingDifference = ratingStats.rating_difference;

      const ratingChangeText = getReviewChangeText(
        todayAvgRating,
        yesterdayAvgRating
      );

      const ratingDirection =
        Number(ratingDifference || 0) >= 0 ? "up" : "down";

      setAvgRating({
        icon: "⭐",
        value: overallAvgRating
          ? Number(overallAvgRating).toFixed(2)
          : "0.00",
        name: "Avg. rating",
        change: ratingChangeText,
        dir: ratingDirection,
      });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);

      setAvgRating({
        icon: "⭐",
        value: "0.00",
        name: "Avg. rating",
        change: "Failed to load",
        dir: "down",
      });
    }
  };
  

  useEffect(() => {
    // if (merchant_id) {
    //   fetchRevenue();
    //   fetchReviews()
    // }
    if (!merchant_id) return;

    const fetchStats = async () => {
      await Promise.all([
        fetchRevenue(),
        fetchReviews(),
      ]);
    };

    fetchStats();
  }, [merchant_id]);

  
  return (
    <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1">
      {stats.map((s) => (
        <div
          className="rounded-2xl border-[1.5px] border-[#ede8de] bg-white px-[clamp(14px,3vw,22px)] py-[clamp(16px,3vw,22px)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(44,36,22,0.09)]"
          key={s.name}
        >
          <span className="mb-2.5 block text-lg">{s.icon}</span>
          <div className="mb-[3px] font-['Cormorant_Garamond'] text-[clamp(26px,4vw,32px)] font-semibold leading-none text-[#2c2416]">
            {s.value}
          </div>
          <div className="text-xs text-[#a09880]">{s.name}</div>
          <div className={`mt-[5px] text-[11px] font-medium ${changeClasses[s.dir] ?? "text-[#5a8f63]"}`}>
            {s.change}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MerchStatsRow



// data/mockData.js

// export const ACTIVITIES = [
//   { type: "order", label: "New order",       detail: "Priya S. — Classic Matcha Latte ×2",        time: "2 min ago",  amount: "$13.00" },
//   { type: "order", label: "New order",       detail: "Wei L. — Matcha Croissant + Iced Lemonade", time: "18 min ago", amount: "$11.50" },
//   { type: "low",   label: "Low stock alert", detail: "Matcha Tiramisu (6 left)",                  time: "1 hr ago",   amount: null },
//   { type: "order", label: "New order",       detail: "Amirah R. — Matcha Tiramisu ×2",            time: "1 hr ago",   amount: "$18.00" },
//   { type: "login", label: "Store opened",    detail: "for the day",                               time: "8:02 AM",    amount: null },
// ];

// export const STATS = [
//   { icon: "🛍️", value: "24",   name: "Orders today",  change: "↑ 12% vs yesterday", dir: "up" },
//   { icon: "💰", value: "$318",  name: "Revenue today", change: "↑ 8% vs yesterday",  dir: "up" },
//   { icon: "⭐", value: "4.9",   name: "Avg. rating",   change: "↑ from 4.8",          dir: "up" },
// ];

// function MerchStatsRow({ merchant_id, stats = STATS }) {