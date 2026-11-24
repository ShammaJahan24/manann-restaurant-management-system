
import DashboardLayout from "@/src/components/layout/DashboardLayout";

import StatsCard from "@/src/components/dashboard/StatsCard";
import SalesChart from "@/src/components/dashboard/SalesChart";
import RecentOrders from "@/src/components/dashboard/RecentOrders";
import PopularItems from "@/src/components/dashboard/PopularItems";

import { statsData } from "@/src/data/dashboardData";

import {
  CalendarDays,
  Download,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-7">

        {/* Page Heading */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#203C32]">
              Dashboard Overview
            </h1>

            <p className="mt-1 text-sm text-[#7B8279]">
              Here&apos;s what&apos;s happening at your restaurant today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-[#E5E9E2] bg-white px-4 py-2.5 text-sm font-medium text-[#64756B] hover:bg-[#F7F6F0]">
              <CalendarDays size={17} />
              Today
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-[#234B3E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1B3C31]">
              <Download size={17} />
              Export Report
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statsData.map((item) => (
            <StatsCard
              key={item.title}
              data={item}
            />
          ))}
        </div>

        {/* Sales Chart */}
        <div className="grid grid-cols-1 gap-5">
          <SalesChart />
        </div>

        {/* Orders and Popular Items */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentOrders />
          </div>

          <div className="xl:col-span-1">
            <PopularItems />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E9E2] pt-5 text-center">
          <p className="text-xs text-[#7B8279]">
            © 2026 Mannan Restaurant Management System.
            All rights reserved.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}
