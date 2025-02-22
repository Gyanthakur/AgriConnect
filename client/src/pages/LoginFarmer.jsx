import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const LoginFarmer = ({isDarkMode}) => {
	const { token, setToken, backendUrl } = useContext(AppContext);
	const [state, setState] = useState("Sign Up");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		setLoading(true);

    try {
      if(state === "Sign Up"){
        const {data} = await axios.post(backendUrl  +'/api/farmer/register', {name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
          toast.success("Farmer Signed up successfully")
        }
        else{
          toast.error(data.message);
        }
      }
      else{
        const {data} = await axios.post(backendUrl  +'/api/farmer/login', {email,password})
        if(data.success){
          localStorage.setItem('token',data.token);

          setToken(data.token);
          toast.success("Farmer logged in successfully")
        }
        else{
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error(error.message);
    }
	finally{
		setLoading(false);
	}
	};

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

	return (
		<form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
			<div className={`flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl  ${isDarkMode ? 'text-white' : 'text-zinc-600'} text-sm shadow-2xl`}>
				<p className="text-2xl font-semibold">
					{state === "Sign Up" ? "Create Account" : "Login"}
				</p>
				<p>
					Please {state === "Sign Up" ? "Sign Up" : "Log In"} to  <span className="text-green-500 underline font-medium">Sell Your Crop </span>

				</p>
				{state === "Sign Up" && (
					<div className="w-full">
						<p>Full Name</p>
						<input
							className={`border ${isDarkMode ? 'text-black' : ''} border-zinc-300 rounded w-full p-2 mt-1`}
							type="text"
							onChange={(e) => setName(e.target.value)}
							value={name}
							placeholder="Gyan Pratap Singh"
							required
						/>
					</div>
				)}
				<div className="w-full">
					<p>Email</p>
					<input
						className={`border ${isDarkMode ? 'text-black' : ''} border-zinc-300 rounded w-full p-2 mt-1`}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						placeholder="gps.96169@gmail.com"
						required
					/>
				</div>
				<div className="w-full">
					<p>Password</p>
					<input
						className={`border ${isDarkMode ? 'text-black' : ''} border-zinc-300 rounded w-full p-2 mt-1`}
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						placeholder="password"
						required
					/>
				</div>
				<button type="submit" className="bg-primary text-white w-full flex items-center justify-center p-2 rounded-md text-base">
					{loading ? <Loading/> : state === "Sign Up" ? "Create Account" : "Login"}
				</button>
				{state === "Sign Up" ? (
					<p>
						Already have an account?{" "}
						<span
							onClick={() => setState("Login")}
							className="text-primary underline cursor-pointer"
						>
							Login here
						</span>{" "}
					</p>
				) : (
					<p>
						Create a new account?{" "}
						<span
							onClick={() => setState("Sign Up")}
							className="text-primary underline cursor-pointer"
						>
							Click here
						</span>
					</p>
				)}
			</div>
		</form>
	);
};

export default LoginFarmer;




