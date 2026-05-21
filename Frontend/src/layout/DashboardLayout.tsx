import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }: any) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 bg-light min-vh-100">
        <Topbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}


