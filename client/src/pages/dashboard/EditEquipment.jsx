import { Formwix } from "formwix";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "../../utils/token.utils";
import { useParams } from "react-router-dom";
import ImagesInput from "../../components/dashboard/MultiImageUplaod";
import TagsInput from "../../components/dashboard/TagsInput";

export default function EditEquipment() {
  const { equipmentId } = useParams();
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [equipmentData, setEquipmentData] = useState(null);

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/equipment/get-equipment/${equipmentId}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch equipment data.");
        const result = await response.json();
        const data = result.data;
        if (!data?.isUserEquipment) {
          toast.error("You are not authorized to edit this equipment.");
          window.location.href = "/equipment/" + equipmentId;
          return;
        }
        setEquipmentData(data);
        setTags(data.tags || []);
        setImages(data.images || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEquipment();
  }, [equipmentId]);

  const equipmentFormConfig = {
    fields: [
      {
        type: "text",
        name: "name",
        label: "Equipment Name",
        placeholder: "e.g., Tractor, Irrigation Pump",
        validation: {
          required: { value: true, message: "Name is required" },
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
        label: "Price Per Day",
        placeholder: "e.g., 500",
        validation: {
          required: { value: true, message: "Price is required" },
          min: { value: 0, message: "Price must be positive" },
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
      },
      {
        type: "text",
        name: "contactNumber",
        label: "Contact Number",
        placeholder: "e.g., +91XXXXXXXXXX",
        validation: {
          required: { value: true, message: "Contact number is required" },
        },
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Describe the equipment...",
      },
      {
        type: "date",
        name: "availableFrom",
        label: "Available From",
        validation: {
          required: { value: true, message: "Start date is required" },
        },
      },
      {
        type: "date",
        name: "availableTo",
        label: "Available To",
        validation: {
          required: { value: true, message: "End date is required" },
        },
      },
      {
        type: "checkbox",
        name: "isArchived",
        label: "Archive this listing?",
      },
      {
        type: "checkbox",
        name: "safetyCheckPassed",
        label: "Passed Safety Check?",
      },
    ],
    submitButtonLabel: isSubmitting ? "Updating..." : "Update Equipment",
    defaultValues: equipmentData || {},
    validationMode: "all",
    onSubmit: async (data, utils) => {
      const toastId = toast.loading("Updating equipment...");
      try {
        if (images.length < 1) {
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
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/equipment/update-equipment/${equipmentId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(body),
          }
        );
        if (!response.ok) throw new Error("Failed to update equipment.");
        const result = await response.json();
        toast.update(toastId, {
          render: "Equipment updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        utils.reset();
        window.location.href = "/equipment/" + result.data?._id;
      } catch (error) {
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

  if (loading) return <div className="p-4">Loading equipment details...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="mb-1 text-3xl font-bold">Edit Equipment</h1>
        <p className="text-gray-600">
          Update the details of your equipment listing below. Modify the
          necessary fields and click "Update Equipment".
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4 md:p-4">
        <ImagesInput images={images} setImages={setImages} />
        <TagsInput tags={tags} setTags={setTags} placeholder="Edit tags" />
        <Formwix config={equipmentFormConfig} />
      </div>
      {error && <p className="px-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
