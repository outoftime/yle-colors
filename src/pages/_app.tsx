import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { datadogRum } from "@datadog/browser-rum";
import Head from "next/head";

import { ErrorBoundary } from "../components/ErrorBoundary";

datadogRum.init({
	applicationId: "f60f57a8-e1db-42cf-93a9-a196425ca832",
	clientToken: "pubf3c788bd7815c009787b1f14a61c1c57",
	site: "datadoghq.com",
	service: "web-client",
	env: process.env.NODE_ENV,
	// Specify a version number to identify the deployed version of your application in Datadog
	// version: '1.0.0',
	sampleRate: 100,
	trackInteractions: true,
});

const queryClient = new QueryClient({
	defaultOptions: { queries: { useErrorBoundary: true } },
});

const MyApp = ({ Component, pageProps }: AppProps) => (
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<ErrorBoundary>
					<Head>
						<meta property="og:title" content="Your Local COVID Precautions" />
						<meta
							property="og:url"
							content="https://yourlocalcovidprecautions.com"
						/>
						<meta property="og:type" content="website" />
						<meta
							property="og:description"
							content="A tool to help you evaluate the current COVID risk in your
				locality and take precautions appropriate to the case rate."
						/>
					</Head>
					<Box width="60ch" maxWidth="90vw" mx="auto" my="1em">
						<Component {...pageProps} />
					</Box>
				</ErrorBoundary>
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

export default MyApp;
