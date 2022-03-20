import "./App.css";
import { useTestData } from "./useTestData";
import { useState } from "react";
import { usePopulations } from "./usePopulations";
import { CountySelect } from "./CountySelect";
import { Results } from "./Results";

const App = () => {
	const {
		data: populations,
		isLoading: populationsIsLoading,
		error: populationsError,
	} = usePopulations();

	const [currentCounty, setCurrentCounty] = useState<string>();

	const isLoading = populationsIsLoading;
	const error = populationsError;

	if (isLoading) return <div>Loading…</div>;
	if (error != null) {
		return <div>Error! {(error as Error).toString()}</div>;
	}

	return (
		<>
			<CountySelect
				counties={Object.keys(populations!)}
				currentCounty={currentCounty}
				setCurrentCounty={setCurrentCounty}
			/>
			{currentCounty != null && (
				<Results currentCounty={currentCounty} populations={populations!} />
			)}
		</>
	);
};

export default App;
