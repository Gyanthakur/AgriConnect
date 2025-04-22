import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Loader, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Pencil } from "phosphor-react";
import { AppContext } from "../../context/AppContext";
import { getToken } from "../../utils/token.utils";

export default function MyEquipment() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (!user) return;
    const fetchEquipment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/equipment/my-equipments`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setEquipmentList(res.data.data.equipments || []);
      } catch (err) {
        console.error("Failed to fetch equipment", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
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
        <h1 className="mb-1 text-3xl font-bold">My Equipment</h1>
        <p className="text-gray-600">
          Manage and view your listed equipment here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {equipmentList.map((equipment) => (
          <div
            key={equipment._id}
            className="transition bg-white border rounded-xl hover:shadow-md"
          >
            <img
              src={equipment.images?.[0] || "/placeholder.jpg"}
              alt={equipment.name}
              className="object-cover w-full h-40 rounded-t-2xl"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{equipment.name}</h2>
                {equipment.safetyCheckPassed && (
                  <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded-full">
                    Safety Passed
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{equipment.category}</p>
              <p className="mt-2 text-sm">{equipment.description}</p>
              <div className="flex justify-between mt-4 text-sm text-gray-700">
                <span>
                  <strong>
                    {equipment.currency} {equipment.pricePerDay}
                  </strong>{" "}
                  / day
                </span>
                <span>📞 {equipment.contactNumber}</span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Available:{" "}
                {new Date(equipment.availableFrom).toLocaleDateString()} -{" "}
                {new Date(equipment.availableTo).toLocaleDateString()}
              </div>

              {/* Edit button */}
              <div className="mt-4">
                <Link
                  to={`/dashboard/equipments/edit/${equipment._id}`}
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
