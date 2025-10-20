export default function SignIn() {
	return (
		<form className="flex flex-col space-y-7 my-8">
			<input
				type="email"
				placeholder="Email"
				className="rounded-md p-3 bg-slate-800 outline-none"
			/>
			<input
				type="password"
				placeholder="Password"
				className="rounded-md p-3 bg-slate-800 outline-none"
			/>

			<button
				type="submit"
				className="flex w-full p-2 justify-center rounded-md bg-sky-600"
			>
				Sign In
			</button>
		</form>
	);
}
