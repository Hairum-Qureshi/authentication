import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function SignUp() {
	const { signUp } = useAuth();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");

	return (
		<form className="mt-8">
			<div className="flex flex-col space-y-7">
				<div className="flex items-center space-x-2">
					<input
						type="text"
						placeholder="First Name"
						className="rounded-md p-3 w-1/2 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Last Name"
						className="rounded-md p-3 w-1/2 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>
				</div>
				<input
					type="email"
					placeholder="Email"
					className="rounded-md p-3 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="rounded-md p-3 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					className="rounded-md p-3 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
					value={confirmedPassword}
					onChange={e => setConfirmedPassword(e.target.value)}
				/>
			</div>
			<button
				type="submit"
				className="flex w-full p-2 justify-center rounded-md bg-sky-600 hover:cursor-pointer"
				onClick={e => {
					e.preventDefault();
					signUp(firstName, lastName, email, password, confirmedPassword);
				}}
			>
				Create Account
			</button>
		</form>
	);
}
