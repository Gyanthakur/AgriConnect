import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar";
import { useLayoutEffect } from "react";
import { getToken } from "../../utils/token.utils";

export default function DashboardLayout() {
  useLayoutEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?redirect=dashboard";
    }
  }, []);
  if (!getToken()) return null;
  return (
    <div className="w-full h-[92vh] overflow-y-scroll flex flex-row">
      <Sidebar />
      <main className="flex-1 h-full p-6 overflow-y-scroll bg-white no-scrollbar dark:bg-zinc-900">
        <Outlet />
      </main>
    </div>
  );
}
