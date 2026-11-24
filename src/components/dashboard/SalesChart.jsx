
"use client";

import { useState } from "react";
import {
  TrendingUp,
  Wallet,
  ShoppingBag,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

const salesData = {
  "This Week": [
    { day: "Mon", sales: 8500, orders: 32 },
    { day: "Tue", sales: 11200, orders: 41 },
    { day: "Wed", sales: 9800, orders: 36 },
    { day: "Thu", sales: 14500, orders: 52 },
    { day: "Fri", sales: 12800, orders: 47 },
    { day: "Sat", sales: 18500, orders: 68 },
    { day: "Sun", sales: 10150, orders: 38 },
  ],

  "Last Week": [
    { day: "Mon", sales: 7200, orders: 28 },
    { day: "Tue", sales: 9500, orders: 35 },
    { day: "Wed", sales: 8900, orders: 33 },
    { day: "Thu", sales: 12100, orders: 45 },
    { day: "Fri", sales: 11000, orders: 40 },
    { day: "Sat", sales: 15300, orders: 59 },
    { day: "Sun", sales: 8700, orders: 31 },
  ],
};

const formatCurrency = (amount) =>
  `Rs. ${amount.toLocaleString("en-IN")}`;

export default function SalesChart() {
  const [activeWeek, setActiveWeek] = useState("This Week");
  const [selectedDay, setSelectedDay] = useState("Sat");
  const [animationKey, setAnimationKey] = useState(0);

  const currentData = salesData[activeWeek];

  const selectedItem =
    currentData.find((item) => item.day === selectedDay) ||
    currentData[0];

  const totalSales = currentData.reduce(
    (total, item) => total + item.sales,
    0
  );

  const totalOrders = currentData.reduce(
    (total, item) => total + item.orders,
    0
  );

  const maxSales = Math.max(
    ...currentData.map((item) => item.sales)
  );

  const highestSalesDay = currentData.reduce((best, item) =>
    item.sales > best.sales ? item : best
  );

  const handleWeekChange = (week) => {
    setActiveWeek(week);
    setSelectedDay("Sat");
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-[#F1E3DE] bg-white p-5 shadow-[0_8px_35px_rgba(142,69,80,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(142,69,80,0.11)] sm:p-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F16B62] to-[#FF9B83] text-white shadow-lg shadow-[#F16B62]/20">
            <TrendingUp size={21} />
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight text-[#743D47]">
              Sales Overview
            </h3>
            <p className="mt-1 text-xs text-[#AD9293]">
              Track your restaurant&apos;s performance
            </p>
          </div>
        </div>

        {/* Week Selector */}
        <div className="flex rounded-xl bg-[#FFF5F0] p-1">
          {Object.keys(salesData).map((week) => (
            <button
              key={week}
              type="button"
              onClick={() => handleWeekChange(week)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                activeWeek === week
                  ? "bg-gradient-to-r from-[#F16B62] to-[#FF9B83] text-white shadow-md shadow-[#F16B62]/25"
                  : "text-[#AD9293] hover:bg-white hover:text-[#B95458]"
              }`}
            >
              {week}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Total Sales */}
        <div className="group relative overflow-hidden rounded-2xl border border-[#F8DDD4] bg-gradient-to-br from-[#FFF0EB] via-[#FFF8F5] to-[#FFE2D9] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F16B62]/10">
          <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full bg-[#F16B62]/10 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <p className="text-sm font-medium text-[#AD7779]">
              Total Sales
            </p>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-[#F16B62] shadow-sm">
              <Wallet size={18} />
            </div>
          </div>

          <h2 className="relative mt-3 text-2xl font-bold tracking-tight text-[#87434D]">
            {formatCurrency(totalSales)}
          </h2>

          <p className="relative mt-1 text-xs text-[#B78E8D]">
            Revenue for {activeWeek.toLowerCase()}
          </p>
        </div>

        {/* Total Orders */}
        <div className="group relative overflow-hidden rounded-2xl border border-[#EEDFE0] bg-gradient-to-br from-[#FFF7F4] via-[#FFFDFB] to-[#F8E8E8] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8E4550]/10">
          <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full bg-[#C98285]/10 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <p className="text-sm font-medium text-[#AD7779]">
              Total Orders
            </p>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-[#B66C73] shadow-sm">
              <ShoppingBag size={18} />
            </div>
          </div>

          <h2 className="relative mt-3 text-2xl font-bold tracking-tight text-[#87434D]">
            {totalOrders.toLocaleString("en-IN")}
          </h2>

          <p className="relative mt-1 text-xs text-[#B78E8D]">
            Orders this week
          </p>
        </div>
      </div>

      {/* Selected Day Details */}
      <div
        key={`${activeWeek}-${selectedDay}`}
        className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#914B55] via-[#B75D63] to-[#E77C70] p-5 text-white shadow-lg shadow-[#A64F59]/15"
      >
        <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 right-28 h-36 w-36 rounded-full bg-[#FFB29C]/20 blur-2xl" />

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-white/75">
              {selectedItem.day} · {activeWeek}
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {formatCurrency(selectedItem.sales)}
            </h2>

            <p className="mt-1 text-xs text-white/70">
              Daily restaurant revenue
            </p>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/15 px-5 py-3 text-right backdrop-blur-md">
            <p className="text-xs text-white/75">
              Total Orders
            </p>
            <p className="mt-1 text-xl font-bold">
              {selectedItem.orders}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-[#87434D]">
              Daily Sales
            </h4>
            <p className="mt-1 text-xs text-[#AD9293]">
              Select any day to view its details
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#B77A7C]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F16B62]" />
            Sales amount
          </div>
        </div>

        <div className="flex h-56 items-end justify-between gap-2 border-b border-[#F1E3DE] px-1 sm:gap-4">
          {currentData.map((item, index) => {
            const isSelected = item.day === selectedDay;
            const barHeight = (item.sales / maxSales) * 100;

            return (
              <button
                key={`${animationKey}-${item.day}`}
                type="button"
                onClick={() => setSelectedDay(item.day)}
                aria-label={`${item.day}: ${formatCurrency(item.sales)}`}
                aria-pressed={isSelected}
                className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3 outline-none"
              >
                <div className="relative flex h-full w-full max-w-12 items-end">
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#914B55] px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                    {formatCurrency(item.sales)}
                  </div>

                  {/* Bar */}
                  <div
                    style={{
                      height: `${barHeight}%`,
                      animation: `salesBarGrow 900ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 90}ms both`,
                    }}
                    className={`w-full rounded-t-xl transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-t from-[#E85D55] via-[#F16B62] to-[#FFAD91] shadow-lg shadow-[#F16B62]/30 ring-1 ring-[#F16B62]/20"
                        : "bg-gradient-to-t from-[#F5B8AA] to-[#FFE2D9] group-hover:from-[#F16B62] group-hover:to-[#FFAD91] group-hover:shadow-md group-hover:shadow-[#F16B62]/20"
                    }`}
                  />
                </div>

                <span
                  className={`mb-2 text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? "scale-110 text-[#E85D55]"
                      : "text-[#B99C9C] group-hover:text-[#B95458]"
                  }`}
                >
                  {item.day}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-[#AD9293]">
            Highest sales day
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[#87434D]">
            {highestSalesDay.day}
            <span className="rounded-md bg-[#FFF0EB] px-2 py-1 text-[10px] font-semibold text-[#E76B61]">
              {formatCurrency(highestSalesDay.sales)}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-[#DCEFE4] bg-[#F0F9F3] px-3 py-2 text-xs font-semibold text-[#459875]">
          <ArrowUpRight size={15} />
          Weekly performance
        </div>
      </div>

      {/* First-load and week-switch animation */}
      <style jsx>{`
        @keyframes salesBarGrow {
          from {
            height: 0%;
            opacity: 0.3;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
