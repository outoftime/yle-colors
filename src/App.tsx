import "./App.css";
import { ChakraProvider, Select } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useTestData } from "./useTestData";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<App2 />
			</ChakraProvider>
		</QueryClientProvider>
	);
};

const App2 = () => {
	const { data, isLoading, error } = useTestData();
	const {
		data: populations,
		isLoading: populationsIsLoading,
		error: populationsError,
	} = useQuery<{ [county: string]: number }>(
		"NYPopulations",
		async () => (await import("./ny-population.json")).default,
	);

	const [currentCounty, setCurrentCounty] = useState<string>();

	if (isLoading || populationsIsLoading) return <div>Loading…</div>;
	if (error) return <div>Error! {(error as Error).toString()}</div>;
	if (populationsError) return <div>Error! {(error as Error).toString()}</div>;

	return (
		<>
			<Select
				placeholder="Choose your county"
				onChange={(e) => setCurrentCounty(e.target.value)}
			>
				{Object.keys(populations!)
					.sort()
					.map((county) => (
						<option key={county} value={county}>
							{county}
						</option>
					))}
			</Select>
			{currentCounty != null && data != null && populations != null && (
				<div>
					<p>
						Test positive rate:{" "}
						{data[currentCounty].positivesLast7Days /
							data[currentCounty].testsLast7Days}
					</p>
					<p>
						Cases per 100K:{" "}
						{Math.round(
							data[currentCounty].positivesLast7Days /
								(populations[currentCounty] / 100000),
						)}
					</p>
				</div>
			)}
		</>
	);
};

export default App;
