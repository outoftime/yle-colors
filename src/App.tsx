import "./App.css";
import { ChakraProvider, Select } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import groupBy from 'lodash.groupby';
import { useMemo } from "react";

type NewYorkCovidTestingResponse = {
	test_date: string;
	county: string;
	new_positives: string;
	cumulative_number_of_positives: string;
	total_number_of_tests: string;
	cumulative_number_of_tests: string;
};

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<App2 />
			</ChakraProvider>
		</QueryClientProvider>
	);
}

const App2 = () => {
	const { data, isLoading, error } = useQuery(
		"NewYorkCovidTesting",
		async (): Promise<NewYorkCovidTestingResponse[]> => {
			const response = await fetch(
				"https://health.data.ny.gov/resource/xdss-u53e.json",
				{
					method: "GET",
					headers: {
						"X-App-Token": "xGzkzivvgpxWhiBxi55htQH7B",
					},
				},
			);
			return response.json();
		},
	);

	const dataByCounty = useMemo(() => 
		groupBy(data, 'county')
	, [data])

	if (isLoading) return <div>Loading…</div>;
	if (error) return <div>Error! {(error as Error).toString()}</div>;

	return (
		<Select placeholder="Choose your county">
			{Object.keys(dataByCounty!).sort().map((county) => (
				<option key={county} value={county}>
					{county}
				</option>
			))}
		</Select>
	);
};

export default App;