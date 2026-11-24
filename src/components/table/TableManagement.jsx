
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  Armchair,
  LayoutGrid,
  RefreshCw,
  MapPin,
  ChevronDown,
} from "lucide-react";

import { tableData } from "@/src/data/tableData";
import TableDetailsModal from "./TableDetailsModal";

const statusStyles = {
  Available: {
    card: "border-emerald-200 bg-emerald-50/70 hover:border-emerald-400",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
  },
  Occupied: {
    card: "border-blue-200 bg-blue-50/70 hover:border-blue-400",
    dot: "bg-blue-500",
    text: "text-blue-700",
  },
  Reserved: {
    card: "border-amber-200 bg-amber-50/70 hover:border-amber-400",
    dot: "bg-amber-500",
    text: "text-amber-700",
  },
  "Needs Cleaning": {
    card: "border-orange-200 bg-orange-50/70 hover:border-orange-400",
    dot: "bg-orange-500",
    text: "text-orange-700",
  },
  "Out of Service": {
    card: "border-rose-200 bg-rose-50/70 hover:border-rose-400",
    dot: "bg-rose-500",
    text: "text-rose-700",
  },
};

const statusOptions = [
  "All Status",
  "Available",
  "Occupied",
  "Reserved",
  "Needs Cleaning",
  "Out of Service",
];

const areas = [
  "All Areas",
  "Main Hall",
  "Outdoor",
  "Private Room",
];

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#234B3E]">
            {value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

export default function TableManagement() {
  const [tables, setTables] = useState(tableData);
  const [selectedTable, setSelectedTable] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [areaFilter, setAreaFilter] = useState("All Areas");

  const stats = useMemo(() => ({
    total: tables.length,
    available: tables.filter((t) => t.status === "Available").length,
    occupied: tables.filter((t) => t.status === "Occupied").length,
    reserved: tables.filter((t) => t.status === "Reserved").length,
    cleaning: tables.filter((t) => t.status === "Needs Cleaning").length,
    outOfService: tables.filter((t) => t.status === "Out of Service").length,
  }), [tables]);

  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      const searchMatch = table.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All Status" ||
        table.status === statusFilter;

      const areaMatch =
        areaFilter === "All Areas" ||
        table.area === areaFilter;

      return searchMatch && statusMatch && areaMatch;
    });
  }, [tables, search, statusFilter, areaFilter]);

  const updateTableStatus = (tableId, newStatus) => {
    setTables((currentTables) =>
      currentTables.map((table) =>
        table.id === tableId
          ? { ...table, status: newStatus }
          : table
      )
    );

    setSelectedTable((currentTable) =>
      currentTable?.id === tableId
        ? { ...currentTable, status: newStatus }
        : currentTable
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Status");
    setAreaFilter("All Areas");
  };

  return (
    <div className="min-h-screen space-y-7 bg-[#F8F6EF] p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#A18A58]">
            <span className="h-2 w-2 rounded-full bg-[#A18A58]" />
            Restaurant Operations
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#234B3E]">
            Table Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage dining tables, monitor occupancy and view active orders.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-[#EAE5D9] bg-white px-4 py-3 text-sm text-[#234B3E] shadow-sm">
          <MapPin size={17} className="text-[#A18A58]" />
          Mannan Restaurant
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Tables"
          value={stats.total}
          icon={LayoutGrid}
          color="bg-[#EAF0EB] text-[#234B3E]"
        />

        <StatCard
          title="Available"
          value={stats.available}
          icon={Armchair}
          color="bg-emerald-100 text-emerald-700"
        />

        <StatCard
          title="Occupied"
          value={stats.occupied}
          icon={Users}
          color="bg-blue-100 text-blue-700"
        />

        <StatCard
          title="Reserved"
          value={stats.reserved}
          icon={Armchair}
          color="bg-amber-100 text-amber-700"
        />

        <StatCard
          title="Cleaning"
          value={stats.cleaning}
          icon={RefreshCw}
          color="bg-orange-100 text-orange-700"
        />

        <StatCard
          title="Out of Service"
          value={stats.outOfService}
          icon={Armchair}
          color="bg-rose-100 text-rose-700"
        />
      </div>

      {/* Floor Layout Container */}
      <div className="rounded-3xl border border-[#EAE5D9] bg-white p-5 shadow-sm sm:p-7">

        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-[#234B3E]">
              Restaurant Floor Layout
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Select any table to view its details.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ["Available", "bg-emerald-500"],
              ["Occupied", "bg-blue-500"],
              ["Reserved", "bg-amber-500"],
              ["Needs Cleaning", "bg-orange-500"],
              ["Out of Service", "bg-rose-500"],
            ].map(([status, color]) => (
              <div
                key={status}
                className="flex items-center gap-2 rounded-full bg-[#F8F6EF] px-3 py-2 text-xs text-gray-600"
              >
                <span className={`h-2 w-2 rounded-full ${color}`} />
                {status}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search table number..."
              className="w-full rounded-xl border border-[#EAE5D9] bg-[#FFFEFA] py-3 pl-11 pr-4 text-sm text-[#234B3E] outline-none transition focus:border-[#A18A58]"
            />
          </div>

          <div className="relative">
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#EAE5D9] bg-[#FFFEFA] px-4 py-3 text-sm text-[#234B3E] outline-none focus:border-[#A18A58]"
            >
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#EAE5D9] bg-[#FFFEFA] px-4 py-3 text-sm text-[#234B3E] outline-none focus:border-[#A18A58]"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 rounded-xl border border-[#EAE5D9] px-4 text-sm font-semibold text-[#234B3E] transition hover:bg-[#F8F6EF]"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Area Groups */}
        {areas.slice(1).map((area) => {
          const areaTables = filteredTables.filter(
            (table) => table.area === area
          );

          if (areaTables.length === 0) return null;

          return (
            <div key={area} className="mt-9">
              <div className="mb-5 flex items-center justify-between border-b border-[#EAE5D9] pb-3">
                <div>
                  <h3 className="font-bold text-[#234B3E]">
                    {area}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    {areaTables.length} tables displayed
                  </p>
                </div>

                <span className="rounded-lg bg-[#F0EFE6] px-3 py-1 text-xs font-semibold text-[#234B3E]">
                  {areaTables.length} Tables
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {areaTables.map((table) => {
                  const style = statusStyles[table.status];

                  return (
                    <button
                      key={table.id}
                      onClick={() => setSelectedTable(table)}
                      className={`group rounded-2xl border p-5 text-left transition duration-200 hover:-translate-y-1 hover:shadow-md ${style.card}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-medium text-gray-500">
                            TABLE
                          </span>

                          <h4 className="mt-1 text-2xl font-bold text-[#234B3E]">
                            {table.name}
                          </h4>
                        </div>

                        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${style.text} bg-white/80`}>
                          {table.status}
                        </span>
                      </div>

                      <div className="my-5 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-current/20 bg-white/70 transition group-hover:scale-105">
                          <div className="text-center">
                            <Armchair
                              size={27}
                              className={`mx-auto ${style.text}`}
                            />
                            <span className="mt-1 block text-xs font-bold text-[#234B3E]">
                              {table.capacity} Seats
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-current/10 pt-4">
                        {table.customer ? (
                          <>
                            <p className="truncate text-sm font-semibold text-[#234B3E]">
                              {table.customer}
                            </p>

                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{table.orderId}</span>
                              <span>{table.elapsedTime}</span>
                            </div>

                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">
                                Bill: {table.billStatus}
                              </span>

                              <span className="font-bold text-[#234B3E]">
                                Rs. {table.total.toLocaleString("en-PK")}
                              </span>
                            </div>
                          </>
                        ) : (
                          <p className="py-2 text-center text-xs text-gray-500">
                            {table.status === "Reserved"
                              ? `Reserved for ${table.customer || "Guest"}`
                              : "No active order"}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 text-center text-xs font-bold text-[#A18A58] opacity-0 transition group-hover:opacity-100">
                        View Table Details →
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredTables.length === 0 && (
          <div className="py-16 text-center">
            <LayoutGrid
              size={35}
              className="mx-auto text-gray-300"
            />
            <h3 className="mt-4 font-bold text-[#234B3E]">
              No tables found
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Try changing your search or filters.
            </p>

            <button
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-[#234B3E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#193A30]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedTable && (
        <TableDetailsModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          onStatusChange={updateTableStatus}
        />
      )}

    </div>
  );
}
