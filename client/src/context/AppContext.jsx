import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
	const currencySymbol = "$";

	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	console.log("url",backendUrl);
	

	
	const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') :false);
	const [mtoken, setMtoken] = useState(localStorage.getItem('mtoken') ? localStorage.getItem('mtoken') :false);
	const [farmerData,setFarmerData] = useState(false)
	const [merchantData,setMerchantData] = useState(false)

	console.log("mt",mtoken);
	

	
	const loadFarmerProfileData = async()=>{
		try {
			const {data} = await axios.get(backendUrl + '/api/farmer/get-profile', {headers:{token}})
			console.log("fd", data);
			
			if(data.success){
				setFarmerData(data.farmerData)
			}else{
				toast.error(data.message)
			}
			
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	}

	const loadMerchantProfileData = async()=>{
		try {
			const {data} = await axios.get(backendUrl + '/api/merchant/get-profile', {headers:{mtoken}})
			console.log("mdata", data);
			
			if(data.success){
				setMerchantData(data.merchantData)
			}else{
				toast.error(data.message)
			}
			
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	}


	const getAllFarmers = async()=>{
		try {
			const {data} = await axios.get(backendUrl + '/api/farmer/all-farmer/', {headers:{token}})
			
			
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	}

	const value = {
	
		currencySymbol,
		token,
		setToken,
        backendUrl,
		farmerData,
		setFarmerData,
		loadFarmerProfileData,
		mtoken,
		setMtoken,
		merchantData,
		setMerchantData,
		loadMerchantProfileData,
		

	};



	useEffect(() => {
		if(token){
			loadFarmerProfileData();
		}else{
			setFarmerData(false)
		}
	}, [token]);

	useEffect(() => {
		if(mtoken){
			loadMerchantProfileData();
		}else{
			setMerchantData(false)
		}
	}, [mtoken]);


	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};

export default AppContextProvider;