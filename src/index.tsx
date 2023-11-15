import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "@radix-ui/themes/styles.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Theme>
				<App />
			</Theme>
		</QueryClientProvider>
	</React.StrictMode>,
);
