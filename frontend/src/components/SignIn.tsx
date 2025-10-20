export default function SignIn() {
	return (
		<form className="my-8">
			<div className="flex flex-col space-y-7 ">
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
