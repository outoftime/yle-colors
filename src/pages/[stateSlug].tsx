import { NextPage } from "next";
import { useRouter } from "next/router";
import { NavigationList } from "../components/NavigationList";
import { useCounties } from "../hooks/api-data";

const State: NextPage = () => {
	const router = useRouter();
	const { stateSlug } = router.query;

	if (typeof stateSlug !== "string") {
		throw new Error("Unexpected query format");
	}
	const state = stateSlug.replace("-", " ");

	const { counties, isLoading, isError, error } = useCounties(state);

	if (isLoading) {
		return <div>Loading…</div>;
	}

	if (isError) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<NavigationList
			items={counties!.map((county) => ({
				label: county,
				path: `/${stateSlug}/${county.replace(" ", "-")}`,
			}))}
		/>
	);
};

export default State;
