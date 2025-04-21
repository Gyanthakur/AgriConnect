import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Leaf, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { Pencil } from "phosphor-react";
import { AppContext } from "../../context/AppContext";
import { getToken } from "../../utils/token.utils";

export default function MyCrops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (!user) return;
    const fetchCrops = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/api/crop/my-crops`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        setCrops(res.data.data.crops || []);
      } catch (err) {
        console.error("Failed to fetch crops", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader className="text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-1 text-3xl font-bold">My Crops</h1>
        <p className="text-gray-600">Manage and view your listed crops here.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {crops.map((crop) => (
          <div
            key={crop._id}
            className="transition bg-white border rounded-xl hover:shadow-md"
          >
            <img
              src={crop.images?.[0] || "/placeholder.jpg"}
              alt={crop.name}
              className="object-cover w-full h-40 rounded-t-2xl"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{crop.name}</h2>
                {crop.isOrganic && (
                  <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded-full">
                    Organic
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{crop.category}</p>
              <p className="mt-2 text-sm">{crop.description}</p>
              <div className="flex justify-between mt-4 text-sm text-gray-700">
                <span>
                  <strong>₹{crop.price}</strong> / {crop.unit}
                </span>
                <span>
                  {crop.quantity} {crop.unit}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Harvest: {new Date(crop.harvestDate).toLocaleDateString()}
              </div>

              {/* Edit button */}
              <div className="mt-4">
                <Link
                  to={`/dashboard/crops/edit/${crop._id}`}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
