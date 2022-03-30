import { useQuery } from "react-query";

export const useStates = () => {
	const {
		data: states,
		isLoading,
		isError,
		error,
	} = useQuery<string[]>(["states"], async () =>
		(await fetch("https://yle-colors-data.herokuapp.com/states")).json(),
	);
	return { states, isLoading, isError, error };
};
