export default function SignUp() {
	return (
		<form className="mt-8">
			<div className="flex flex-col space-y-7">
				<div className="flex items-center space-x-2">
					<input
						type="text"
						placeholder="First Name"
						className="rounded-md p-3 w-1/2 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
					/>
					<input
						type="text"
						placeholder="Last Name"
						className="rounded-md p-3 w-1/2 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
					/>
				</div>
				<input
					type="email"
					placeholder="Email"
					className="rounded-md p-3 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
				/>
				<input
					type="password"
					placeholder="Password"
					className="rounded-md p-3 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					className="rounded-md p-3 bg-slate-800 outline-none focus:outline-none focus:border-sky-500 focus:border"
				/>
			</div>
			<button
				type="submit"
				className="flex w-full p-2 justify-center rounded-md bg-sky-600 hover:cursor-pointer"
			>
				Create Account
			</button>
		</form>
	);
}
