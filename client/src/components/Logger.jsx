"use client";
import { Eye } from "phosphor-react";
import { useState, useEffect } from "react";

export default function Logger({isDarkMode}) {
	const [visitors, setVisitors] = useState(0);

	useEffect(() => {
		async function initLogger() {
			const body = {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					clientSecret: "ec9fcc25-1a94-463d-a36e-57bc39c7ec9e",
					applicationId: "f1c1f49f-67a2-4d67-afe5-b229cd4c265e",
				}),
			};
			const res = await fetch(
				"https://logger-mocha-six.vercel.app/api/logger/v1",
				body
			);
			const json = await res.json();
			if (res.status === 200) {
				setVisitors(json);
			} else {
				// error
				console.log(json);
			}
		}
		initLogger();
	}, []);
	return (
		
        <div className="w-fit m-auto flex justify-center items-center gap-1 text-sm sm:text-xs  sm:p-2 rounded-md  z-50">
       <Eye size={24} /> {visitors}
      </div>
    //     <div className="w-fit m-auto  bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-xs p-3 sm:p-2 rounded-md shadow-lg z-50">
    //     Visitors: {visitors}
    //   </div>
	);
}
