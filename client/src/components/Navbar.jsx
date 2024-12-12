// import React, { useState, useEffect, useRef } from "react";
// import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { assets } from "../assets/assets";
import { Moon, Sun, CaretDown, CaretUp, MoonStars } from "phosphor-react";

// const Dropdown = ({ label, links, isOpen, setIsOpen, bgColor }) => {
// 	const ref = useRef();

// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (ref.current && !ref.current.contains(event.target)) {
// 				setIsOpen(false);
// 			}
// 		};
// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, [setIsOpen]);

// 	return (
// 		<div className="relative w-full" ref={ref}>
// 			<button
// 				className={`px-4 py-2 w-full rounded text-white flex items-center justify-between ${bgColor}`}
// 				onClick={() => setIsOpen(!isOpen)}
// 			>
// 				{label}
// 				{isOpen ? (
// 					<CaretUp size={20} className="ml-2" />
// 				) : (
// 					<CaretDown size={20} className="ml-2" />
// 				)}
// 			</button>
// 			{isOpen && (
// 				<div className="absolute z-10 mt-2 w-full bg-white text-black rounded shadow-lg">
// 					{links.map(({ to, label }, index) => (
// 						<Link
// 							key={index}
// 							to={to}
// 							className="block px-4 py-2 hover:bg-gray-100"
// 							onClick={() => setIsOpen(false)}
// 						>
// 							{label}
// 						</Link>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// const Navbar = ({ isDarkMode, toggleTheme }) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [farmerDropdown, setFarmerDropdown] = useState(false);
// 	const [merchantDropdown, setMerchantDropdown] = useState(false);

// 	return (
// 		<nav
// 			className={`p-4 ${
// 				isDarkMode ? "bg-gray-800 text-white" : "bg-green-600 text-white"
// 			}`}
// 		>
// 			<div className="container mx-auto flex justify-between items-center">
// 				{/* Logo */}
// 				<div className="flex items-center space-x-2">
// 					<img className="w-10 h-10" src={assets.logo} alt="Logo" />
// 					<Link to="/" className="text-2xl font-bold">
// 						Agriconnect
// 					</Link>
// 				</div>

// 				{/* Desktop Links */}
// 				<div className="hidden md:flex justify-center items-center space-x-6">
// 					<Link to="/" className="hover:underline">
// 						Home
// 					</Link>
// 					<Link to="/about-us" className="hover:underline">
// 						About
// 					</Link>
// 					<SignedIn>
// 						<Link to="/services" className="hover:underline">
// 							Services
// 						</Link>
// 						<Link to="/contact-us" className="hover:underline">
// 							Contact
// 						</Link>
// 						<UserButton className="hover:underline" />
// 					</SignedIn>
// 					<SignedOut>
// 						<Dropdown
// 							label="Farmer"
// 							links={[
// 								{ to: "/farmer-signup", label: "Signup" },
// 								{ to: "/farmer-login", label: "Login" },
// 							]}
// 							isOpen={farmerDropdown}
// 							setIsOpen={setFarmerDropdown}
// 							bgColor="bg-yellow-600 hover:bg-yellow-700"
// 						/>
// 						<Dropdown
// 							label="Merchant"
// 							links={[
// 								{ to: "/merchant-signup", label: "Signup" },
// 								{ to: "/merchant-login", label: "Login" },
// 							]}
// 							isOpen={merchantDropdown}
// 							setIsOpen={setMerchantDropdown}
// 							bgColor="bg-blue-600 hover:bg-blue-700"
// 						/>
// 					</SignedOut>
// 					<button onClick={toggleTheme} className="ml-4">
// 						{isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
// 					</button>
// 				</div>

// 				{/* Mobile Menu Button */}
// 				<button
// 					onClick={() => setIsOpen(!isOpen)}
// 					className="md:hidden focus:outline-none ml-4"
// 				>
// 					<span className="block w-6 h-0.5 bg-white mb-1"></span>
// 					<span className="block w-6 h-0.5 bg-white mb-1"></span>
// 					<span className="block w-6 h-0.5 bg-white"></span>
// 				</button>
// 			</div>

// 			{/* Mobile Menu Links */}
// 			{isOpen && (
// 				<div className="md:hidden mt-4 flex flex-col items-center space-y-4">
// 					<Link to="/" className="hover:underline">
// 						Home
// 					</Link>
// 					<Link to="/about-us" className="hover:underline">
// 						About
// 					</Link>
// 					<SignedIn>
// 						<Link to="/services" className="hover:underline">
// 							Services
// 						</Link>
// 						<Link to="/contact-us" className="hover:underline">
// 							Contact
// 						</Link>
// 						<UserButton />
// 					</SignedIn>
// 					<SignedOut>
// 						<Link
// 							to="/farmer-signup"
// 							className={`px-4 py-2 border rounded-full ${
// 								isDarkMode
// 									? "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
// 									: "border-white text-white hover:bg-blue-500 hover:text-white"
// 							}`}
// 						>
// 							Farmer Signup
// 						</Link>
// 						<Link
// 							to="/farmer-login"
// 							className={`px-4 py-2 border rounded-full ${
// 								isDarkMode
// 									? "border-green-500 text-green-500 hover:bg-yellow-500 hover:text-white"
// 									: "border-white text-white hover:bg-blue-500 hover:text-white"
// 							}`}
// 						>
// 							Farmer Login
// 						</Link>
// 						<Link
// 							to="/merchant-signup"
// 							className={`px-4 py-2 border rounded-full ${
// 								isDarkMode
// 									? "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
// 									: "border-white text-white hover:bg-blue-500 hover:text-white"
// 							}`}
// 						>
// 							Merchant Signup
// 						</Link>
// 						<Link
// 							to="/merchant-login"
// 							className={`px-4 py-2 border rounded-full ${
// 								isDarkMode
// 									? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
// 									: "border-white text-white hover:bg-blue-500 hover:text-white"
// 							}`}
// 						>
// 							Merchant Login
// 						</Link>
// 					</SignedOut>
// 					<button onClick={toggleTheme}>
// 						{isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
// 					</button>
// 				</div>
// 			)}
// 		</nav>
// 	);
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = ({ isDarkMode, toggleTheme }) => {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};



	const { token, setToken, farmerData, mtoken, setMtoken, merchantData } =
		useContext(AppContext);

	const logout = () => {
		setToken(false);
    setMtoken(false);
		localStorage.removeItem("token");
		localStorage.removeItem("mtoken");
		navigate("/");
	};

	return (
		<nav
			className={`p-4 text-white border-b ${
				isDarkMode ? "bg-gray-800 " : "bg-green-600 "
			}`}
		>
			<div className="container mx-auto flex justify-between items-center">
				{/* Logo */}
				<div
					className="flex items-center space-x-2 cursor-pointer"
					onClick={() => navigate("/")}
				>
					<img className="w-10 h-10" src={assets.logo} alt="Logo" />
					<h1 className="text-2xl font-bold">Agriconnect</h1>
				</div>

				{/* Desktop Links */}
				<ul className="hidden md:flex items-center space-x-6 font-medium">
					<NavLink to="/" className="hover:underline">
						<li>Home</li>
					</NavLink>
					<NavLink to="/about-us" className="hover:underline">
						<li>About</li>
					</NavLink>
					<NavLink to="/contact-us" className="hover:underline">
						<li>Contact</li>
					</NavLink>
					{token ? (
						<>
							<NavLink to="/services" className="hover:underline">
								<li>Services</li>
							</NavLink>
							<NavLink to="/farmer-dashboard" className="hover:underline">
								<li>My Dashboard</li>
							</NavLink>
							<div className="relative group">
								<img
									className="w-8 h-8 rounded-full cursor-pointer"
									src={farmerData.image}
									alt="Profile"
								/>
								<div
									className={`absolute right-0 mt-2 w-48 rounded shadow-lg hidden group-hover:block ${
										isDarkMode
											? "bg-gray-700 text-white"
											: "bg-white text-black"
									}`}
								>
									<p
										onClick={() => navigate("/my-profile")}
										className={`block px-4 py-2 ${
											isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
										} cursor-pointer`}
									>
										My Profile
									</p>

									<p
										onClick={logout}
										className={`block px-4 py-2 ${
											isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
										} cursor-pointer`}
									>
										Logout
									</p>
								</div>
							</div>
						</>
					) : mtoken ? (
						// <>
						// 	<NavLink to="/services" className="hover:underline">
						// 		<li>Services</li>
						// 	</NavLink>
						// 	<NavLink to="/merchant-dashboard" className="hover:underline">
						// 		<li>My Dashboard</li>
						// 	</NavLink>
						// 	<div className="relative group">
						// 		<img
						// 			className="w-8 h-8 rounded-full cursor-pointer"
						// 			src={merchantData.image}
						// 			alt="Profile"
						// 		/>
						// 		<div
						// 			className={`absolute right-0 mt-2 w-48 rounded shadow-lg hidden group-hover:block ${
						// 				isDarkMode
						// 					? "bg-gray-700 text-white"
						// 					: "bg-white text-black"
						// 			}`}
						// 		>
						// 			<p
						// 				onClick={() => navigate("/my-m-profile")}
						// 				className={`block px-4 py-2 ${
						// 					isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
						// 				} cursor-pointer`}
						// 			>
						// 				My Profile
						// 			</p>

						// 			<p
						// 				onClick={logout}
						// 				className={`block px-4 py-2 ${
						// 					isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
						// 				} cursor-pointer`}
						// 			>
						// 				Logout
						// 			</p>
						// 		</div>
						// 	</div>
						// </>

            <>
			<NavLink to="/services" className="hover:underline">
				<li>Services</li>
			</NavLink>
			<NavLink to="/merchant-dashboard" className="hover:underline">
				<li>My Dashboard</li>
			</NavLink>
			<div className="relative">
				<img
					className="w-8 h-8 rounded-full cursor-pointer"
					src={merchantData.image}
					alt="Profile"
					onClick={toggleDropdown} // Toggle dropdown on click
				/>
				{isDropdownOpen && ( // Render dropdown if state is true
					<div
						className={`absolute right-0 mt-2 w-48 rounded shadow-lg ${
							isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
						}`}
					>
						<p
							onClick={() => {
								navigate("/my-m-profile");
								setIsDropdownOpen(false); // Close dropdown after navigation
							}}
							className={`block px-4 py-2 ${
								isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
							} cursor-pointer`}
						>
							My Profile
						</p>
						<p
							onClick={() => {
								logout();
								setIsDropdownOpen(false); // Close dropdown after logout
							}}
							className={`block px-4 py-2 ${
								isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
							} cursor-pointer`}
						>
							Logout
						</p>
					</div>
				)}
			</div>
		</>
					) : (
						<>
							<NavLink
								to="/login-farmer"
								className="px-4 py-2 bg-yellow-600 rounded-full hover:bg-yellow-700"
							>
								Farmer Signup
							</NavLink>
							<NavLink
								to="/login-merchant"
								className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700"
							>
								Merchant Signup
							</NavLink>
						</>
					)}

					<button onClick={toggleTheme} className="ml-4">
						{isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
					</button>
				</ul>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setShowMenu(!showMenu)}
					className="md:hidden focus:outline-none"
				>
					<span className="block w-6 h-0.5 bg-current mb-1"></span>
					<span className="block w-6 h-0.5 bg-current mb-1"></span>
					<span className="block w-6 h-0.5 bg-current"></span>
				</button>
			</div>

			{/* Mobile Menu */}
			{showMenu && (
				<div
					className={`md:hidden mt-4 flex flex-col items-center space-y-4 ${
						isDarkMode ? "bg-gray-800 text-white" : "bg-green-600 text-black"
					}`}
				>
					<NavLink to="/" className="hover:underline">
						Home
					</NavLink>
					<NavLink to="/about-us" className="hover:underline">
						About
					</NavLink>
					<NavLink to="/contact-us" className="hover:underline">
						Contact
					</NavLink>
					{token ? (
						<>
							<NavLink to="/services" className="hover:underline">
								Services
							</NavLink>

							<p
								onClick={() => navigate("/my-profile")}
								className={`block px-4 py-2 ${
									isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
								} cursor-pointer`}
							>
								My Profile
							</p>

							<button onClick={logout} className="text-red-500 hover:underline">
								Logout
							</button>
						</>
					) : mtoken ? (
						<>
							<NavLink to="/services" className="hover:underline">
								Services
							</NavLink>

							<p
								onClick={() => navigate("/my-m-profile")}
								className={`block px-4 py-2 ${
									isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
								} cursor-pointer`}
							>
								My Profile
							</p>

							<button onClick={logout} className="text-red-500 hover:underline">
								Logout
							</button>
						</>
					)
        : (
          <>
							<NavLink
								to="/login-farmer"
								className="px-4 py-2 bg-yellow-600 rounded-full hover:bg-yellow-700"
							>
								Farmer Signup
							</NavLink>
							<NavLink
								to="/login-merchant"
								className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700"
							>
								Merchant Signup
							</NavLink>
						</>
        )}
					<button onClick={toggleTheme} className="ml-4">
						{isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
					</button>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
