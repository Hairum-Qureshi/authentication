import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoutesGuard from "./ProtectedRoutesGuard";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/profile"
					element={
						<ProtectedRoutesGuard>
							<Profile />
						</ProtectedRoutesGuard>
					}
				/>
				;
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
