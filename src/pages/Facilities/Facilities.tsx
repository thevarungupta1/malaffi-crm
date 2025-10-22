import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MoreVertical, Eye, Edit, Trash2, Plus, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Facility {
  facilityId: number;
  groupId: number;
  displayName: string;
  name: string;
  licenseNumber: number;
  emrSystemDetails: string;
  facilityTypeId: number;
  facilitySubTypeId: number;
  licenseRenewal: string | null;
  facilityContacts: any[];
  facilityEMRs: any[];
  status?: "Active" | "Inactive" | "Maintenance"; // Optional for backward compatibility
}

const mockFacilities: Facility[] = [
  {
    facilityId: 1,
    groupId: 1,
    displayName: "City Hospital",
    name: "City Hospital Main Branch",
    licenseNumber: 12345,
    emrSystemDetails: "Cerner System",
    facilityTypeId: 1,
    facilitySubTypeId: 1,
    licenseRenewal: null,
    facilityContacts: [],
    facilityEMRs: [],
    status: "Active"
  },
  {
    facilityId: 3,
    groupId: 1,
    displayName: "Central Clinic",
    name: "Central Clinic - Main Branch",
    licenseNumber: 123456,
    emrSystemDetails: "Epic EMR v2.1",
    facilityTypeId: 1,
    facilitySubTypeId: 1,
    licenseRenewal: null,
    facilityContacts: [],
    facilityEMRs: [],
    status: "Active"
  },
  {
    facilityId: 4,
    groupId: 1,
    displayName: "Central Clinic",
    name: "Central Clinic - Main Branch",
    licenseNumber: 123456,
    emrSystemDetails: "Epic EMR v2.1",
    facilityTypeId: 1,
    facilitySubTypeId: 1,
    licenseRenewal: null,
    facilityContacts: [],
    facilityEMRs: [],
    status: "Inactive"
  }
];

export const Facilities = () => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getStatusColor = (status?: string) => {
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
    facility.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.emrSystemDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.licenseNumber.toString().includes(searchTerm)
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
            placeholder="Search by facility name, license number, or EMR system..."
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
                  Display Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EMR System
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFacilities.map((facility) => (
                <tr key={facility.facilityId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      <div className="text-sm font-medium text-gray-900">{facility.displayName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{facility.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{facility.licenseNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{facility.emrSystemDetails}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(facility.status)}`}>
                      {facility.status || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(facility.facilityId)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {openMenuId === facility.facilityId && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                          <div className="py-1">
                            <button 
                              onClick={() => handleViewDetails(facility.facilityId)}
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