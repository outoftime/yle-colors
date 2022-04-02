import { useQuery } from "react-query";

const API_ROOT = "https://yle-colors-data.herokuapp.com";

type CaseRateResult = {
	"7_day_cases_per_100k": number;
	date: string;
};

export const useStates = () => {
	const {
		data: states,
		isLoading,
		isError,
		error,
	} = useQuery<string[]>(["states"], async () =>
		(await fetch(`${API_ROOT}/states`)).json(),
	);
	return { states, isLoading, isError, error };
};

export const useCounties = (state: string) => {
	const {
		data: counties,
		isLoading,
		isError,
		error,
	} = useQuery<string[]>(["counties", state], async () =>
		(await fetch(`${API_ROOT}/states/${state}/counties`)).json(),
	);
	return { counties, isLoading, isError, error };
};

export const useCaseRate = (state: string, county: string) => {
	const {
		data: caseRate,
		isLoading,
		isError,
		error,
	} = useQuery<CaseRateResult>(["caseRate", state, county], async () =>
		(
			await fetch(
				`${API_ROOT}/states/${state}/counties/${county}/7_day_cases_per_100k`,
			)
		).json(),
	);
	return { caseRate, isLoading, isError, error };
};
