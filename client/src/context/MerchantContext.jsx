// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const MerchantContext = createContext();

// const MerchantContextProvider = (props) => {
// 	const currencySymbol = "$";

// 	const backendUrl = import.meta.env.VITE_BACKEND_URL;
// 	console.log("url",backendUrl);
	

	

// 	const [mtoken, setMtoken] = useState(localStorage.getItem('mtoken') ? localStorage.getItem('mtoken') :false);

// 	const [merchantData,setMerchantData] = useState(false)

// 	console.log("mt",mtoken);
	

	


// 	const loadMerchantProfileData = async()=>{
// 		try {
// 			const {data} = await axios.get(backendUrl + '/api/merchant/get-profile', {headers:{mtoken}})
// 			console.log("mdata", data);
			
// 			if(data.success){
// 				setMerchantData(data.merchantData)
// 			}else{
// 				toast.error(data.message)
// 			}
			
// 		} catch (error) {
// 			console.log(error);
// 			toast.error(error.message);
// 		}
// 	}

// 	const value = {
	
// 		currencySymbol,
//         backendUrl,
// 		mtoken,
// 		setMtoken,
// 		merchantData,
// 		setMerchantData,
// 		loadMerchantProfileData,
		

// 	};



// 	useEffect(() => {
// 		if(token){
// 			loadFarmerProfileData();
// 		}else{
// 			setFarmerData(false)
// 		}
// 	}, [token]);

// 	useEffect(() => {
// 		if(mtoken){
// 			loadMerchantProfileData();
// 		}else{
// 			setMerchantData(false)
// 		}
// 	}, [mtoken]);


// 	return (
// 		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
// 	);
// };

// export default MerchantContextProvider;