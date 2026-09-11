import * as React from "react"
export const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: any = {
    NORMAL: "bg-green-100 text-green-800",
    WARNING: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-orange-100 text-orange-800",
    CRITICAL: "bg-red-100 text-red-800",
    OFFLINE: "bg-gray-100 text-gray-800",
  };
  return <span className={`px-2 py-1 rounded text-xs font-bold ${colorMap[status] || "bg-blue-100 text-blue-800"}`}>{status}</span>
}
