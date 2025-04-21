import { Formwix } from "formwix";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "../../utils/token.utils";
import { useParams } from "react-router-dom";
import { X } from "phosphor-react";
import ImagesInput from "../../components/dashboard/MultiImageUplaod";
import TagsInput from "../../components/dashboard/TagsInput";

export default function EditCrop() {
  const { cropId } = useParams();
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cropData, setCropData] = useState(null);

  useEffect(() => {
    async function fetchCrop() {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/crop/get-crop/" + cropId,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch crop data.");
        const result = await response.json();
        const data = result.data;
        if (data.isUserCrop === false) {
          toast.error("You are not authorized to edit this crop.");
          window.location.href = "/shop/" + cropId;
          return;
        }
        setCropData(data);
        setTags(data.tags || []);
        setImages(data.images || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCrop();
  }, [cropId]);

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
    submitButtonLabel: isSubmitting ? "Updating..." : "Update Crop",
    defaultValues: cropData || {},
    onSubmit: async (data, utils) => {
      const toastId = toast.loading("Updating crop details...");
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
          import.meta.env.VITE_BACKEND_URL + "/api/crop/update-crop/" + cropId,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(body),
          }
        );
        if (!response.ok) throw new Error("Failed to update crop.");
        const result = await response.json();
        toast.update(toastId, {
          render: "Crop updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        utils.reset();
        window.location.href = "/shop/" + result.data?._id;
      } catch (error) {
        console.error("Error updating form:", error);
        setError(error.message || "Failed to update form.");
        toast.update(toastId, {
          render: error.message || "Failed to update form.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  };
  if (loading) return <div className="p-4">Loading crop details...</div>;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="mb-1 text-3xl font-bold">Edit Crop</h1>
        <p className="text-gray-600">
          Update the details of your crop listing below. Modify the necessary
          fields and click "Update Crop".
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4 md:p-4">
        <ImagesInput images={images} setImages={setImages} />
        <TagsInput tags={tags} setTags={setTags} placeholder="Edit tags" />
        <Formwix config={cropFormConfig} />
      </div>
      {error && <p className="px-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
