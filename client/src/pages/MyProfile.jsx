import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { AppContext } from "../context/AppContext"; // Adjust the import path as needed
import { toast } from "react-toastify";
import { getToken } from "../utils/token.utils";

const ProfilePage = () => {
  const { user, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });
    const toastId = toast.loading("Updating profile...");
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/user/update-user",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.update(toastId, {
          render: "Profile updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setUser(data.data);
        setMessage({ text: "Profile updated successfully!", type: "success" });
      } else {
        toast.update(toastId, {
          render: "Failed to update profile",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setMessage({ text: "Failed to update profile", type: "error" });
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to update profile",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setMessage({ text: error.message, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      image: user?.image || "",
      gender: user?.gender || "Not Selected",
      dob: user?.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
      address: {
        line: user?.address?.line || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        zip: user?.address?.zip || "",
        country: user?.address?.country || "India",
      },
    });
  }, [user]);
  useLayoutEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?redirect=/my-profile";
    }
  }, []);
  if (!formData) return null;
  return (
    <div className="mx-auto">
      <div className="shadow-sm ">
        <div className="p-4">
          <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
            Edit Profile
          </h1>

          <UpdateProfileImage />

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            {/* Read-only fields */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Phone Number (Non-editable)
                </label>
                <input
                  type="text"
                  value={user?.phone || ""}
                  disabled
                  className="w-full p-2 bg-gray-100 border rounded-md cursor-not-allowed dark:bg-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Aadhar (Non-editable)
                </label>
                <input
                  type="text"
                  value={
                    user?.aadharId
                      ? "********" + user?.aadharId.slice(-4)
                      : "No Aadhar ID"
                  }
                  disabled
                  className="w-full p-2 bg-gray-100 border rounded-md cursor-not-allowed dark:bg-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Farmer Id (Non-editable)
                </label>
                <input
                  type="text"
                  value={
                    user?.farmerId
                      ? "********" + user?.farmerId.slice(-4)
                      : "No Aadhar ID"
                  }
                  disabled
                  className="w-full p-2 bg-gray-100 border rounded-md cursor-not-allowed dark:bg-gray-600"
                />
              </div>
            </div>

            {/* Editable fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                Address
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Address Line
                  </label>
                  <input
                    type="text"
                    name="address.line"
                    value={formData.address.line}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="address.zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Country
                  </label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Message display */}
            {message.text && (
              <div
                className={`mt-6 p-3 rounded-md ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 mr-4 text-gray-800 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

const UpdateProfileImage = () => {
  const { user, setUser } = useContext(AppContext);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    const toastId = toast.loading("Uploading profile image...");
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/user/update-profile-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.update(toastId, {
          render: "Profile image updated!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setUser(data.data);
      } else {
        toast.update(toastId, {
          render: data.message || "Failed to update image",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Error uploading image",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-32 h-32">
      <img
        src={user?.image}
        alt="Profile"
        className="object-cover w-full h-full border border-gray-300 rounded-full"
      />

      <button
        onClick={() => inputRef.current.click()}
        className="absolute bottom-0 right-0 px-2 py-1 text-xs text-white bg-black rounded-full bg-opacity-60 hover:bg-opacity-80"
        disabled={loading}
      >
        {loading ? "..." : "Edit"}
      </button>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
