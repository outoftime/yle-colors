import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<Box width="60ch" maxWidth="90vw" mx="auto" my="1em">
					<Component {...pageProps} />
				</Box>
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

export default MyApp;
