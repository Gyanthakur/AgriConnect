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
					clientSecret: "3e8d6e30-e320-406e-831e-538899ab7b66",
					applicationId: "b2ce46b8-a0c5-491c-bf7f-1542c839a563",
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
