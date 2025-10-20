import { Menu } from "lucide-react";
import { AvatarMenu } from "../shared/AvatarMenu";

interface TopbarProps {
  toggleSidebar?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm relative z-10">
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-md hover:bg-gray-100 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="relative">
        <AvatarMenu />
      </div>
    </header>
  );
};
