import SignIn from "../SignIn";
import SignUp from "../SignUp";
import forestImage from "../../assets/forest.png";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";

export default function Landing() {
	const [currentForm, setCurrentForm] = useState("sign-up");

	return (
		<div className="w-full min-h-screen max-h-auto bg-black text-white">
			<div className="flex lg:flex-row flex-col w-full min-h-screen">
				<div className="lg:w-1/2 relative flex items-center justify-center">
					<img
						src={forestImage}
						className="object-cover h-full w-full lg:rounded-4xl"
						alt="Forest image"
					/>
					<h1 className="absolute text-7xl font-semibold text-white z-10">
						Forest Auth
					</h1>
				</div>
				<div className="lg:w-1/2 flex items-center min-h-screen text-white">
					<div className="lg:w-4/5 w-full rounded-lg p-6 mx-auto">
						<h3 className="text-center mb-5 font-semibold text-3xl">
							{currentForm === "sign-up"
								? "Create An Account"
								: "Sign Into Account"}
						</h3>
						<div className="flex rounded-md overflow-hidden mx-auto">
							<button
								className={`w-1/2 py-2 hover:cursor-pointer ${
									currentForm === "sign-up"
										? "bg-sky-700 hover:bg-sky-800"
										: "bg-gray-800 hover:bg-gray-700"
								} transition-colors`}
								onClick={() => setCurrentForm("sign-up")}
							>
								Sign Up
							</button>
							<button
								className={`w-1/2 py-2 hover:cursor-pointer ${
									currentForm === "sign-in"
										? "bg-sky-700 hover:bg-sky-800"
										: "bg-gray-800 hover:bg-gray-700"
								} transition-colors`}
								onClick={() => setCurrentForm("sign-in")}
							>
								Sign In
							</button>
						</div>
						{currentForm === "sign-up" ? <SignUp /> : <SignIn />}
						<div className="flex items-center my-5">
							<div className="flex-grow border-t border-slate-500"></div>
							<span className="mx-4 text-slate-500">or</span>
							<div className="flex-grow border-t border-slate-500"></div>
						</div>
						<button className="w-full rounded-md p-[1px] bg-gradient-to-r from-blue-500 to-purple-500 hover:cursor-pointer">
							<p className="flex w-full items-center rounded-md bg-slate-800 p-2 text-white justify-center">
								<span className="mr-2">
									<FaGoogle />
								</span>
								Sign {currentForm === "sign-up" ? "Up" : "In"} With Google
							</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
