import { useQuery } from "react-query";

const API_ROOT = "https://api.yourlocalcovidprecautions.com";

type CaseRateResult = {
	"7_day_cases_per_100k": number;
	date: string;
};

export const useStates = () => {
	const { data: states, isLoading } = useQuery<string[]>(["states"], async () =>
		(await fetch(`${API_ROOT}/states`)).json(),
	);
	return { states, isLoading };
};

export const useCounties = (state: string) => {
	const { data: counties, isLoading } = useQuery<string[]>(
		["counties", state],
		async () => (await fetch(`${API_ROOT}/states/${state}/counties`)).json(),
	);
	return { counties, isLoading };
};

export const useCaseRate = (state: string, county: string) => {
	const { data: caseRate, isLoading } = useQuery<CaseRateResult>(
		["caseRate", state, county],
		async () =>
			(
				await fetch(
					`${API_ROOT}/states/${state}/counties/${county}/7_day_cases_per_100k`,
				)
			).json(),
	);
	return { caseRate, isLoading };
};
