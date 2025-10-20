import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ArrowLeft, Save, Building2, Users, Phone, Mail, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FacilityFormData {
  // Facility Information
  name: string;
  facilityType: string;
  address: string;
  linkedGroup: string;
  facilityStage: string;
  status: "Active" | "Inactive" | "Maintenance";
  
  // Group Details
  groupName: string;
  contactPerson: string;
  email: string;
  phone: string;

  // Provider Information
  providerName: string;
  providerLicense: string;
  providerSpecialty: string;

  // Provider Contact
  providerPhone: string;
  providerEmail: string;
  providerAddress: string;

  // EMR Contacts
  emrSystemName: string;
  emrContactPerson: string;
  emrContactEmail: string;

  // Miscellaneous
  notes: string;
  establishedDate: string;
}

type TabType = "overview" | "provider" | "contact" | "emr" | "misc";

export const AddFacility = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [formData, setFormData] = useState<FacilityFormData>({
    name: "",
    facilityType: "",
    address: "",
    linkedGroup: "",
    facilityStage: "",
    status: "Active",
    groupName: "",
    contactPerson: "",
    email: "",
    phone: "",
    providerName: "",
    providerLicense: "",
    providerSpecialty: "",
    providerPhone: "",
    providerEmail: "",
    providerAddress: "",
    emrSystemName: "",
    emrContactPerson: "",
    emrContactEmail: "",
    notes: "",
    establishedDate: ""
  });

  const handleBack = () => {
    navigate("/facilities");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Facility data to save:", formData);
    // For now, just navigate back to facilities page
    navigate("/facilities");
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
            {/* Facility Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Facility Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Facility Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter facility name"
                  />
                </div>
                <div>
                  <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-2">
                    Facility Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="facilityType"
                    name="facilityType"
                    value={formData.facilityType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="">Select facility type</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Emergency Center">Emergency Center</option>
                    <option value="Urgent Care">Urgent Care</option>
                    <option value="Specialty Center">Specialty Center</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter facility address"
                  />
                </div>
                <div>
                  <label htmlFor="linkedGroup" className="block text-sm font-medium text-gray-700 mb-2">
                    Linked Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="linkedGroup"
                    name="linkedGroup"
                    value={formData.linkedGroup}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="">Select linked group</option>
                    <option value="City General Hospital">City General Hospital</option>
                    <option value="Metro Health Center">Metro Health Center</option>
                    <option value="Suburban Medical Group">Suburban Medical Group</option>
                    <option value="Regional Care Network">Regional Care Network</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="facilityStage" className="block text-sm font-medium text-gray-700 mb-2">
                    Facility Stage <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="facilityStage"
                    name="facilityStage"
                    value={formData.facilityStage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="">Select facility stage</option>
                    <option value="Planning">Planning</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Operational">Operational</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Group Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Group Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="groupName"
                    name="groupName"
                    value={formData.groupName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter group name"
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter contact person name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "provider":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Provider Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="providerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Name
                </label>
                <input
                  type="text"
                  id="providerName"
                  name="providerName"
                  value={formData.providerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter provider name"
                />
              </div>
              <div>
                <label htmlFor="providerLicense" className="block text-sm font-medium text-gray-700 mb-2">
                  Provider License
                </label>
                <input
                  type="text"
                  id="providerLicense"
                  name="providerLicense"
                  value={formData.providerLicense}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter license number"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="providerSpecialty" className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Specialty
                </label>
                <input
                  type="text"
                  id="providerSpecialty"
                  name="providerSpecialty"
                  value={formData.providerSpecialty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter provider specialty"
                />
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Provider Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="providerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Phone
                </label>
                <input
                  type="tel"
                  id="providerPhone"
                  name="providerPhone"
                  value={formData.providerPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter provider phone"
                />
              </div>
              <div>
                <label htmlFor="providerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Email
                </label>
                <input
                  type="email"
                  id="providerEmail"
                  name="providerEmail"
                  value={formData.providerEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter provider email"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="providerAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Address
                </label>
                <input
                  type="text"
                  id="providerAddress"
                  name="providerAddress"
                  value={formData.providerAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter provider address"
                />
              </div>
            </div>
          </div>
        );

      case "emr":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">EMR Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="emrSystemName" className="block text-sm font-medium text-gray-700 mb-2">
                  EMR System Name
                </label>
                <input
                  type="text"
                  id="emrSystemName"
                  name="emrSystemName"
                  value={formData.emrSystemName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter EMR system name"
                />
              </div>
              <div>
                <label htmlFor="emrContactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                  EMR Contact Person
                </label>
                <input
                  type="text"
                  id="emrContactPerson"
                  name="emrContactPerson"
                  value={formData.emrContactPerson}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter EMR contact person"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="emrContactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  EMR Contact Email
                </label>
                <input
                  type="email"
                  id="emrContactEmail"
                  name="emrContactEmail"
                  value={formData.emrContactEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter EMR contact email"
                />
              </div>
            </div>
          </div>
        );

      case "misc":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Miscellaneous Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="establishedDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Established Date
                </label>
                <input
                  type="date"
                  id="establishedDate"
                  name="establishedDate"
                  value={formData.establishedDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter additional notes or information"
                />
              </div>
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Facility</h2>
            <p className="text-gray-600 mt-1">Create a new healthcare facility in your network</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Facility
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-md border mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    type="button"
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

        {/* Form Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Facility
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};