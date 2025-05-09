import { Formwix } from "formwix";
import { useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "../../utils/token.utils";
import ImagesInput from "../../components/dashboard/MultiImageUplaod";
import TagsInput from "../../components/dashboard/TagsInput";

export default function AddEquipment() {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const equipmentFormConfig = {
    fields: [
      {
        type: "text",
        name: "name",
        label: "Equipment Name",
        placeholder: "e.g., Tractor, Harvester",
        validation: {
          required: { value: true, message: "Equipment name is required" },
        },
      },
      {
        type: "select",
        name: "category",
        label: "Category",
        options: [
          { label: "Tractor", value: "Tractor" },
          { label: "Irrigation", value: "Irrigation" },
          { label: "Harvesting", value: "Harvesting" },
          { label: "Ploughing", value: "Ploughing" },
          { label: "Others", value: "Others" },
        ],
        validation: {
          required: { value: true, message: "Category is required" },
        },
      },
      {
        type: "number",
        name: "pricePerDay",
        label: "Rental Price per Day",
        placeholder: "e.g., 1500",
        validation: {
          required: { value: true, message: "Price is required" },
          min: { value: 0, message: "Price must be non-negative" },
        },
      },
      {
        type: "select",
        name: "currency",
        label: "Currency",
        options: [
          { label: "INR", value: "INR" },
          { label: "USD", value: "USD" },
        ],
        validation: {
          required: { value: true, message: "Currency is required" },
        },
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Describe the equipment...",
      },
      {
        type: "text",
        name: "contactNumber",
        label: "Contact Number",
        placeholder: "e.g., +91-9876543210",
        validation: {
          required: { value: true, message: "Contact number is required" },
        },
      },
      {
        type: "date",
        name: "availableFrom",
        label: "Available From",
        validation: {
          required: { value: true, message: "Availability date is required" },
        },
      },
      {
        type: "date",
        name: "availableTo",
        label: "Available To",
        validation: {
          required: { value: true, message: "Availability date is required" },
        },
      },
      {
        type: "checkbox",
        name: "safetyCheckPassed",
        label: "Safety Check Passed",
      },
      {
        type: "checkbox",
        name: "isArchived",
        label: "Archive this listing?",
      },
    ],
    submitButtonLabel: isSubmitting ? "Adding..." : "Add Equipment",
    defaultValues: {
      currency: "INR",
      isArchived: false,
      safetyCheckPassed: false,
    },
    onSubmit: async (data, utils) => {
      const toastId = toast.loading("Submitting equipment details...");
      try {
        if (images.length === 0) {
          toast.error("Please upload at least one image.");
          return;
        }
        setSubmitting(true);
        const body = {
          ...data,
          tags,
          images,
        };
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/equipment/add-equipment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(body),
          }
        );
        if (!response.ok) throw new Error("Failed to add equipment.");
        const result = await response.json();
        toast.update(toastId, {
          render: "Equipment added successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        utils.reset();
        window.location.href = "/rental/" + result.data?._id;
      } catch (error) {
        console.error("Error submitting form:", error);
        setError(error.message || "Failed to submit form.");
        toast.error(error.message || "Failed to submit form.");
        toast.update(toastId, {
          render: error.message || "Failed to submit form.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="mb-1 text-3xl font-bold">Add Equipment</h1>
        <p className="text-gray-600">
          Fill out the form below to add new farming equipment. Include pricing,
          availability dates, category, images, and safety status.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-4 mt-4">
        <ImagesInput images={images} setImages={setImages} />
        <TagsInput tags={tags} setTags={setTags} placeholder="Add tags" />
        <Formwix config={equipmentFormConfig} />
      </div>
      {error && <p className="px-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
