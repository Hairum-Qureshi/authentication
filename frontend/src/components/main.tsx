import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../css/index.css";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // <-- if you want the devtools

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			{/* <ReactQueryDevtools /> */}{" "}
			{/* <- if you want the devtools component */}
		</QueryClientProvider>
	</React.StrictMode>
);
