import { Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "../../utils/token.utils";
export default function ImagesInput({ images, setImages }) {
  return (
    <div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h3 className="font-medium">
              Cover Images<sup className="text-red-500">*</sup>
            </h3>
          </div>
        </div>
        <div className="w-full md:col-span-2">
          <MultiImageUploader images={images} setImages={setImages} />
        </div>
      </div>
    </div>
  );
}

const MultiImageUploader = ({ maxImages = 5, images, setImages }) => {
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAddImages = async (event) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalImages = images.length + newFiles.length;

      if (totalImages > maxImages) {
        setError(`You can only upload up to ${maxImages} images.`);
        return;
      }

      const validFiles = [];
      for (const file of newFiles) {
        if (file.size > 2 * 1024 * 1024) {
          setError("Each image must be under 2 MB.");
          return;
        } else {
          validFiles.push(file);
        }
      }

      setError(null);
      await uploadImages(validFiles);
    }
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    setUploading(true);
    const toastId = toast.loading("Uploading images...");
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/utils/upload-images",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload images.");
      }

      const data = await response.json();
      setImages([...images, ...(data.data || [])]);
      toast.update(toastId, {
        render: "Images uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("Failed to upload images.");
      toast.update(toastId, {
        render: "Failed to upload images.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImageURL = (url) => {
    setImages(images.filter((image) => image !== url));
  };

  return (
    <div className="flex flex-col gap-2 multi-image-uploader">
      <label
        htmlFor="coverImages"
        className="text-sm flex cursor-pointer text-gray-800 dark:text-darkText-400 font-[450] gap-2 border px-4 py-1 w-full md:w-fit rounded-full bg-gray-100 dark:bg-darkBox-800 dark:border-darkBorder-700"
      >
        <Upload size={20} />
        <span>Select Cover Images</span>
        <input
          type="file"
          id="coverImages"
          name="coverImages"
          accept="image/*"
          multiple
          onChange={handleAddImages}
          className="hidden"
        />
      </label>

      {error && <p className="px-2 text-sm text-red-500">{error}</p>}

      {/* Uploading Indicator */}
      {uploading && <p className="text-sm text-blue-500">Uploading...</p>}

      {/* Uploaded Images */}
      <div className="flex flex-wrap gap-2 text-sm image-list">
        {images.map((url, index) => (
          <div
            key={index}
            className="flex transition duration-500 flex-col items-center justify-between gap-2 round-border overflow-hidden aspect-[2/1] h-24 group border dark:border-darkBorder-700 relative"
          >
            <div className="absolute top-0 left-0 hidden w-full h-full bg-black group-hover:block opacity-40">
              <button
                type="button"
                onClick={() => {
                  handleRemoveImageURL(url);
                }}
                className="absolute p-1 text-white round-border aspect-square top-1 right-2 dark:text-darkText-300"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <img
              src={url}
              alt={`Uploaded ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        {images.length}/{maxImages} images selected
      </p>
    </div>
  );
};
