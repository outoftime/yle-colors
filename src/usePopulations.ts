import { useQuery } from "react-query";

export type Populations = {
	[county: string]: number;
};

export const usePopulations = () => {
	const { data, isLoading, error } = useQuery<Populations>(
		"NYPopulations",
		async () => (await import("./ny-population.json")).default,
	);

	return { data, isLoading, error };
};
