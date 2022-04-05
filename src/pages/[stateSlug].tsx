import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { countyRoute, homeRoute } from "../lib/routes";
import Head from "next/head";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCounties } from "../hooks/api-data";
import { NavigationList } from "../components/NavigationList";

interface StatePageProps {
	stateSlug: string;
}

const StatePage = ({ stateSlug }: StatePageProps) => {
	const state = `${stateSlug}`.replace("-", " ");
	const { counties, isLoading, isError, error } = useCounties(state);

	if (isLoading) {
		return <LoadingSpinner />;
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

const RoutedStatePage: NextPage = () => {
	const router = useRouter();
	const { stateSlug } = router.query;

	if (typeof stateSlug != "string") {
		return <LoadingSpinner />;
	}

	return <StatePage stateSlug={`${stateSlug}`} />;
};

export default RoutedStatePage;
