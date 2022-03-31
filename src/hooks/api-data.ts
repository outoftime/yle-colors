import { useQuery } from "react-query";

const API_ROOT = "https://yle-colors-data.herokuapp.com";

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
