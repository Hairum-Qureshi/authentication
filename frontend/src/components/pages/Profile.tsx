import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Loading from "../Loading";

export default function Profile() {
	const { data: currUserData } = useCurrentUser();
	const { signOut } = useAuth();
	const navigate = useNavigate();

	if (!currUserData) {
		return <Loading />;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
			<div className="max-w-lg w-full bg-gray-800 rounded-2xl shadow-xl p-8">
				<div className="flex flex-col items-center">
					<div className="w-32 h-32 mb-6 relative">
						<img
							src={currUserData.profile_picture}
							alt="User profile"
							className="rounded-full w-full h-full object-cover border-4 border-blue-500 shadow-lg"
							referrerPolicy="no-referrer"
						/>
					</div>
					<h1 className="text-3xl font-semibold mb-2 text-center">
						{currUserData.fullName}
					</h1>
					<p className="text-gray-400 mb-4 text-center">{currUserData.email}</p>
				</div>

				<div className="mt-6 space-y-4">
					<div className="flex justify-between items-center bg-gray-700 rounded-lg p-4 shadow-sm hover:bg-gray-600 transition-colors">
						<span className="font-medium">2FA Enabled</span>
						<span
							className={`font-semibold ${
								currUserData.isMFAEnabled ? "text-green-400" : "text-red-400"
							}`}
						>
							{currUserData.isMFAEnabled ? "Yes" : "No"}
						</span>
					</div>

					{/* Add more user info sections here */}
					{/* <div className="flex justify-between items-center bg-gray-700 rounded-lg p-4 shadow-sm hover:bg-gray-600 transition-colors">
						<span className="font-medium">Account Created</span>
						<span className="text-gray-200">
							{new Date(currUserData.createdAt).toLocaleDateString()}
						</span>
					</div> */}
				</div>

				<div className="mt-8 flex justify-center space-x-3">
					{!currUserData?.isGoogleAccount && !currUserData?.isMFAEnabled && (
						<button
							className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md hover:cursor-pointer"
							onClick={() => navigate("/setup-2fa")}
						>
							Enable 2FA
						</button>
					)}
					<button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md hover:cursor-pointer">
						Delete Profile
					</button>
					<button
						className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md hover:cursor-pointer"
						onClick={() => signOut()}
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	);
}
