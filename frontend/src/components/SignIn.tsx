import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function SignIn() {
	const { signIn } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form
			className="my-8"
			onSubmit={e => {
				e.preventDefault();
				signIn(email, password);
			}}
		>
			<div className="flex flex-col space-y-7 ">
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
			</div>
			<button
				type="submit"
				className="flex w-full p-2 justify-center rounded-md bg-sky-600 hover:cursor-pointer"
			>
				Sign In
			</button>
		</form>
	);
}
