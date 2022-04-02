import { NextPage } from "next";
import { useRouter } from "next/router";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { NavigationList } from "../components/NavigationList";
import { useCounties } from "../hooks/api-data";
import { countyRoute, homeRoute, stateRoute } from "../lib/routes";
import { Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

const State: NextPage = () => {
	const router = useRouter();
	const { stateSlug } = router.query;

	const state = `${stateSlug}`.replace("-", " ");

	const { counties, isLoading, isError, error } = useCounties(state);

	if (isLoading) {
		return <div>Loading…</div>;
	}

	if (isError) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<>
			<Head>
				<title>Your Local COVID Precautions | {state}</title>
			</Head>
			<Breadcrumbs
				items={[{ label: "Home", href: homeRoute() }, { label: state }]}
			/>
			<Text>Choose your locality in {state}:</Text>
			<NavigationList
				items={counties!.map((county) => ({
					label: county,
					path: countyRoute({ state, county }),
				}))}
			/>
		</>
	);
};

export default State;
