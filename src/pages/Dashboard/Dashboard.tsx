import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, Building, Activity, PieChart, BarChart3 } from "lucide-react";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome back to Malaffi CRM</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Groups Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Groups</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">4</p>
              <p className="text-sm text-gray-500 mt-1">2 active</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Facilities Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Facilities</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">4</p>
              <p className="text-sm text-gray-500 mt-1">across all groups</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Building className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Recent Activities Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Recent Activities</h3>
              <p className="text-3xl font-bold text-orange-600 mt-2">4</p>
              <p className="text-sm text-gray-500 mt-1">Actions logged today</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Group Status Distribution Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Group Status Distribution</h3>
              <p className="text-sm text-gray-500">Breakdown of groups by current status</p>
            </div>
          </div>
          {/* Pie Chart Placeholder */}
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Pie Chart</p>
              <p className="text-xs text-gray-400">Active: 2, Inactive: 2</p>
            </div>
          </div>
        </div>

        {/* Facilities per Group Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Facilities per Group</h3>
              <p className="text-sm text-gray-500">Top groups by number of linked facilities</p>
            </div>
          </div>
          {/* Bar Chart Placeholder */}
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Bar Chart</p>
              <p className="text-xs text-gray-400">Group A: 2, Group B: 1, Group C: 1</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
