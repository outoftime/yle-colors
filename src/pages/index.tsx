import type { NextPage } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { NavigationList } from "../components/NavigationList";
import { useStates } from "../hooks/api-data";

const Home: NextPage = () => {
	const { states: states, isLoading, isError, error } = useStates();
	if (isLoading) {
		return <div>Loading…</div>;
	}
	if (isError) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<>
			<Breadcrumbs items={[{ label: "Home" }]} />
			<NavigationList
				items={states!.map((state) => ({
					label: state,
					path: `/${state.replace(" ", "-")}`,
				}))}
			/>
		</>
	);
};

export default Home;
