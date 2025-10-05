import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    deadline: "",
    details: "",
    link: "",
    awardType: "Scholarship",
    university: "",
    gpa: "",
    gender: "",
    companyName: "",
    organization: "",
    religion: [],
    race: [],
    location: ["No Geographic Restrictions"],
    majors: ["All Majors Eligible"],
    stage: ["no restrictions"],
    sports: [],
    disability: [],
    personalAttributes: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const values = e.target.value.split(',').map((v: string) => v.trim()).filter((v: string) => v);
    setForm({ ...form, [field]: values });
  };

  const handleSubmit = async () => {
    if (!form.name) {
      setError("Scholarship name is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/.netlify/functions/createScholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      
      if (res.ok) {
        setSuccess("Scholarship created successfully! ID: " + result.id);
        setForm({
          name: "",
          amount: "",
          deadline: "",
          details: "",
          link: "",
          awardType: "Scholarship",
          university: "",
          gpa: "",
          gender: "",
          companyName: "",
          organization: "",
          religion: [],
          race: [],
          location: ["No Geographic Restrictions"],
          majors: ["All Majors Eligible"],
          stage: ["no restrictions"],
          sports: [],
          disability: [],
          personalAttributes: []
        });
      } else {
        setError(result.error || "Failed to create scholarship");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError("Network error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Create Scholarship</h1>
          <p className="text-gray-600">Add a new scholarship opportunity to the database</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Alerts */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex items-center">
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-center">
                <span className="text-green-700 font-medium">{success}</span>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-500">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Scholarship Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    placeholder="e.g., SIT Fund Scholarship"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Award Amount
                  </label>
                  <input
                    name="amount"
                    placeholder="e.g., 5000"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Award Type
                  </label>
                  <select
                    name="awardType"
                    value={form.awardType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  >
                    <option value="Scholarship">Scholarship</option>
                    <option value="Grant">Grant</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Award">Award</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    University
                  </label>
                  <input
                    name="university"
                    placeholder="Optional"
                    value={form.university}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Link
                  </label>
                  <input
                    name="link"
                    type="url"
                    placeholder="https://example.com"
                    value={form.link}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Details & Requirements
                  </label>
                  <textarea
                    name="details"
                    placeholder="Describe the scholarship requirements, eligibility criteria, application process, etc."
                    value={form.details}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Eligibility Criteria Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-purple-500">
                Eligibility Criteria
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum GPA
                  </label>
                  <input
                    name="gpa"
                    placeholder="e.g., 3.5"
                    value={form.gpa}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender Requirement
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  >
                    <option value="">No restriction</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    name="companyName"
                    placeholder="Optional"
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    name="organization"
                    placeholder="Optional"
                    value={form.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Geographic Locations
                    <span className="text-gray-500 text-xs ml-2">(comma-separated)</span>
                  </label>
                  <input
                    placeholder="e.g., California, Texas, No Geographic Restrictions"
                    value={form.location.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'location')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Eligible Majors
                    <span className="text-gray-500 text-xs ml-2">(comma-separated)</span>
                  </label>
                  <input
                    placeholder="e.g., Engineering, Computer Science, All Majors Eligible"
                    value={form.majors.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'majors')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Academic Stage
                    <span className="text-gray-500 text-xs ml-2">(comma-separated)</span>
                  </label>
                  <input
                    placeholder="e.g., Undergraduate, Graduate, no restrictions"
                    value={form.stage.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'stage')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sports
                    <span className="text-gray-500 text-xs ml-2">(comma-separated, leave empty if none)</span>
                  </label>
                  <input
                    placeholder="e.g., Basketball, Soccer"
                    value={form.sports.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'sports')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Disability Requirements
                    <span className="text-gray-500 text-xs ml-2">(comma-separated)</span>
                  </label>
                  <input
                    placeholder="Leave empty if none"
                    value={form.disability.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'disability')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Religion
                    <span className="text-gray-500 text-xs ml-2">(comma-separated)</span>
                  </label>
                  <input
                    placeholder="Leave empty if none"
                    value={form.religion.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'religion')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Race/Ethnicity
                    <span className="text-gray-500 text-xs ml-2">(comma-separated)</span>
                  </label>
                  <input
                    placeholder="Leave empty if none"
                    value={form.race.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'race')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Personal Attributes
                    <span className="text-gray-500 text-xs ml-2">(comma-separated)</span>
                  </label>
                  <input
                    placeholder="e.g., First-generation, Low-income"
                    value={form.personalAttributes.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'personalAttributes')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Scholarship"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;