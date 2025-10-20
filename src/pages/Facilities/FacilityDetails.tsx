import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ArrowLeft, MapPin, Building2, Users, Phone, Mail, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface FacilityDetailsData {
  id: number;
  name: string;
  address: string;
  facilityType: string;
  linkedGroup: string;
  facilityStage: string;
  status: "Active" | "Inactive" | "Maintenance";
  groupDetails: {
    groupName: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
}

const mockFacilityDetails: FacilityDetailsData = {
  id: 1,
  name: "Main Medical Center",
  address: "123 Healthcare Ave, Downtown, NY 10001",
  facilityType: "Hospital",
  linkedGroup: "City General Hospital",
  facilityStage: "Operational",
  status: "Active",
  groupDetails: {
    groupName: "City General Hospital",
    contactPerson: "Dr. Sarah Johnson",
    email: "s.johnson@citygeneral.com",
    phone: "+1 (555) 123-4567"
  }
};

type TabType = "overview" | "provider" | "contact" | "emr" | "misc";

export const FacilityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const handleBack = () => {
    navigate("/facilities");
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

  const tabs = [
    { id: "overview", name: "Facility Overview", icon: Building2 },
    { id: "provider", name: "Provider Information", icon: Users },
    { id: "contact", name: "Provider Contact", icon: Phone },
    { id: "emr", name: "EMR Contacts", icon: Mail },
    { id: "misc", name: "Miscellaneous", icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Facility Overview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Facility Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Facility Name</label>
                  <p className="text-gray-900">{mockFacilityDetails.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Facility Type</label>
                  <p className="text-gray-900">{mockFacilityDetails.facilityType}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                  <p className="text-gray-900">{mockFacilityDetails.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Linked Group</label>
                  <p className="text-gray-900">{mockFacilityDetails.linkedGroup}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Facility Stage</label>
                  <p className="text-gray-900">{mockFacilityDetails.facilityStage}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(mockFacilityDetails.status)}`}>
                    {mockFacilityDetails.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Group Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Group Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Group Name</label>
                  <p className="text-gray-900">{mockFacilityDetails.groupDetails.groupName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Contact Person</label>
                  <p className="text-gray-900">{mockFacilityDetails.groupDetails.contactPerson}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <p className="text-gray-900">{mockFacilityDetails.groupDetails.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <p className="text-gray-900">{mockFacilityDetails.groupDetails.phone}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "provider":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Provider Information</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 text-center">Provider information will be displayed here.</p>
              <p className="text-sm text-gray-500 text-center mt-2">This section will contain detailed provider data and credentials.</p>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Provider Contact Information</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 text-center">Provider contact details will be displayed here.</p>
              <p className="text-sm text-gray-500 text-center mt-2">This section will contain phone numbers, addresses, and contact preferences.</p>
            </div>
          </div>
        );

      case "emr":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">EMR Contacts</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 text-center">EMR contact information will be displayed here.</p>
              <p className="text-sm text-gray-500 text-center mt-2">This section will contain Electronic Medical Records system contacts and integration details.</p>
            </div>
          </div>
        );

      case "misc":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Miscellaneous Information</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 text-center">Additional information will be displayed here.</p>
              <p className="text-sm text-gray-500 text-center mt-2">This section will contain additional facility details and metadata.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-gray-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{mockFacilityDetails.name}</h2>
            <p className="text-gray-600 mt-1">Facility Details and Information</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-md border mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};