import { Formwix } from "formwix";
import { Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "../../utils/token.utils";
import { X } from "phosphor-react";
import ImagesInput from "../../components/dashboard/MultiImageUplaod";
import TagsInput from "../../components/dashboard/TagsInput";

export default function AddCrop() {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const cropFormConfig = {
    fields: [
      {
        type: "text",
        name: "name",
        label: "Crop Name",
        placeholder: "e.g., Wheat",
        validation: {
          required: { value: true, message: "Crop name is required" },
        },
      },
      {
        type: "select",
        name: "category",
        label: "Category",
        options: [
          { label: "Grains", value: "Grains" },
          { label: "Vegetables", value: "Vegetables" },
          { label: "Fruits", value: "Fruits" },
          { label: "Legumes", value: "Legumes" },
          { label: "Others", value: "Others" },
        ],
        validation: {
          required: { value: true, message: "Category is required" },
        },
      },
      {
        type: "number",
        name: "price",
        label: "Price per Unit",
        placeholder: "e.g., 25",
        validation: {
          required: { value: true, message: "Price is required" },
          min: { value: 0, message: "Price must be positive" },
        },
      },
      {
        type: "number",
        name: "quantity",
        label: "Available Quantity",
        placeholder: "e.g., 100",
        validation: {
          required: { value: true, message: "Quantity is required" },
          min: { value: 1, message: "Quantity must be at least 1" },
        },
      },
      {
        type: "select",
        name: "unit",
        label: "Unit",
        options: [
          { label: "kg", value: "kg" },
          { label: "g", value: "g" },
          { label: "ton", value: "ton" },
          { label: "litre", value: "litre" },
          { label: "piece", value: "piece" },
        ],
        validation: {
          required: { value: true, message: "Unit is required" },
        },
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Describe the crop...",
      },
      {
        type: "date",
        name: "harvestDate",
        label: "Harvest Date",
        validation: {
          required: { value: true, message: "Harvest date is required" },
        },
      },
      {
        type: "date",
        name: "expiryDate",
        label: "Expiry Date",
        validation: {
          required: { value: true, message: "Expiry date is required" },
        },
      },
      {
        type: "number",
        name: "dispatchTime",
        label: "Dispatch Time (days)",
        validation: {
          required: { value: true, message: "Dispatch time is required" },
          min: { value: 1, message: "Dispatch time must be at least 1 day" },
        },
      },
      {
        type: "checkbox",
        name: "isOrganic",
        label: "Is Organic?",
      },
      {
        type: "checkbox",
        name: "isArchived",
        label: "Archive this listing?",
      },
    ],
    submitButtonLabel: isSubmitting ? "Adding..." : "Add Crop",
    defaultValues: {
      unit: "kg",
      isOrganic: false,
      isArchived: false,
      category: "Others",
      dispatchTime: 1,
    },
    onSubmit: async (data, utils) => {
      const toastId = toast.loading("Submitting crop details...");
      try {
        if (images.length < 0) {
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
          import.meta.env.VITE_BACKEND_URL + "/api/crop/add-crop",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(body),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add crop.");
        }
        const result = await response.json();
        toast.update(toastId, {
          render: "Crop added successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        utils.reset();
        window.location.href = "/shop/" + result.data?._id;
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
      console.log("Form Submitted", data);
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="mb-1 text-3xl font-bold">Add Crop</h1>
        <p className="text-gray-600">
          Fill out the form below to add a new crop to your inventory. Make sure
          to include all relevant details such as category, quantity, price,
          images, and harvest information.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-4 mt-4">
        <ImagesInput images={images} setImages={setImages} />
        <TagsInput tags={tags} setTags={setTags} placeholder="Add tags" />
        <Formwix config={cropFormConfig} />
      </div>
      <div>{error && <p className="px-2 text-sm text-red-500">{error}</p>}</div>
    </div>
  );
}
