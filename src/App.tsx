import "./App.css";
import { useTestData } from "./useTestData";
import { useState } from "react";
import { usePopulations } from "./usePopulations";
import { CountySelect } from "./CountySelect";
import { Results } from "./Results";
import { Box } from "@chakra-ui/react";

const App = () => {
	const {
		data: populations,
		isLoading: populationsIsLoading,
		error: populationsError,
	} = usePopulations();

	const { data: testData } = useTestData();

	const [currentCounty, setCurrentCounty] = useState<string>();

	const isLoading = populationsIsLoading;
	const error = populationsError;

	if (isLoading) return <div>Loading…</div>;
	if (error != null) {
		return <div>Error! {(error as Error).toString()}</div>;
	}

	return (
		<Box maxWidth="50em" mx="auto" as="main" fontSize="xl">
			<Box my="1em">
				<CountySelect
					counties={Object.keys(populations!)}
					currentCounty={currentCounty}
					setCurrentCounty={setCurrentCounty}
				/>
			</Box>
			{currentCounty != null && testData != null && (
				<Results
					county={currentCounty}
					populations={populations!}
					testData={testData[currentCounty]}
				/>
			)}
		</Box>
	);
};

export default App;
