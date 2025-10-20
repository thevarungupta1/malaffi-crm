import { Home, Users, Building, FileText, Wrench, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Groups", icon: Users, path: "/groups" },
  { name: "Facilities", icon: Building, path: "/facilities" },
  { name: "Audit Log", icon: FileText, path: "/audit-log" },
  { name: "Build Operations", icon: Wrench, path: "/build-operations" },
  { name: "Configurations", icon: Settings, path: "/configurations" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
        Malaffi CRM
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex items-center w-full text-left px-4 py-2 rounded-lg transition",
              isActive(item.path)
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};
