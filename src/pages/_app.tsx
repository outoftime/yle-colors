import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

export default MyApp;
