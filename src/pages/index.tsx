import type { NextPage } from "next";
import { useQuery } from "react-query";

const Home: NextPage = () => {
	const {
		data: states,
		isLoading,
		isError,
		error,
	} = useQuery<string[]>(["states"], async () =>
		(await fetch("https://yle-colors-data.herokuapp.com/states")).json(),
	);
	if (isLoading) {
		return <div>Loading…</div>;
	}
	if (isError) {
		console.error(error);
		return <div>Error!</div>;
	}
	return (
		<ul>
			{states!.map((state) => (
				<li key="state">{state}</li>
			))}
		</ul>
	);
};

export default Home;
