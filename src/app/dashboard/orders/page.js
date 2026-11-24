
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import OrdersClient from "@/src/components/orders/OrdersClient";

export const metadata = {
  title: "Orders Management | Mannan Restaurant",
  description: "Manage and track restaurant orders.",
};

export default function OrdersPage() {
  return <OrdersClient />

}
