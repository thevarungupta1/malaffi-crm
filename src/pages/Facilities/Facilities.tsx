import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MoreVertical, Eye, Edit, Trash2, Plus, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Facility {
  id: number;
  name: string;
  address: string;
  status: "Active" | "Inactive" | "Maintenance";
  linkedGroup: string;
}

const mockFacilities: Facility[] = [
  {
    id: 1,
    name: "Main Medical Center",
    address: "123 Healthcare Ave, Downtown, NY 10001",
    status: "Active",
    linkedGroup: "City General Hospital"
  },
  {
    id: 2,
    name: "North Wing Clinic",
    address: "456 Medical Blvd, Uptown, NY 10002",
    status: "Active",
    linkedGroup: "Metro Health Center"
  },
  {
    id: 3,
    name: "Emergency Care Unit",
    address: "789 Emergency St, Midtown, NY 10003",
    status: "Maintenance",
    linkedGroup: "City General Hospital"
  },
  {
    id: 4,
    name: "Suburban Health Facility",
    address: "321 Suburban Way, Suburbs, NY 10004",
    status: "Inactive",
    linkedGroup: "Suburban Medical Group"
  },
  {
    id: 5,
    name: "Regional Treatment Center",
    address: "654 Regional Rd, Regional Area, NY 10005",
    status: "Active",
    linkedGroup: "Regional Care Network"
  }
];

export const Facilities = () => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredFacilities = mockFacilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.linkedGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFacility = () => {
    navigate("/facilities/add");
  };

  const handleViewDetails = (facilityId: number) => {
    navigate(`/facilities/${facilityId}`);
    setOpenMenuId(null);
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Facilities</h2>
          <p className="text-gray-600 mt-1">Manage healthcare facilities in your network</p>
        </div>
        <button 
          onClick={handleAddFacility}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Facility
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by facility name, address, or linked group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Facilities Table */}
      <div className="bg-white rounded-lg shadow-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Linked Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFacilities.map((facility) => (
                <tr key={facility.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      <div className="text-sm font-medium text-gray-900">{facility.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{facility.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(facility.status)}`}>
                      {facility.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{facility.linkedGroup}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(facility.id)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {openMenuId === facility.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                          <div className="py-1">
                            <button 
                              onClick={() => handleViewDetails(facility.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4 mr-3" />
                              View Details
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Edit className="w-4 h-4 mr-3" />
                              Edit
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredFacilities.length === 0 && (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No facilities found matching your search.</p>
        </div>
      )}
    </DashboardLayout>
  );
};