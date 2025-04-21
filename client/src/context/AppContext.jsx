import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../utils/token.utils";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);
  async function fetchUser() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/user/get-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setUser(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const value = {
    currencySymbol,
    user,
    setUser,
    token,
  };

  useEffect(() => {
    if (getToken()) {
      fetchUser();
    }
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
