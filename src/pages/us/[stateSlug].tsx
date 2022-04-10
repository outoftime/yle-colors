import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { countyRoute, homeRoute } from "../../lib/routes";
import Head from "next/head";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useCounties } from "../../hooks/api-data";
import { NavigationList } from "../../components/NavigationList";
import { StateSlug } from "../../lib/routes";

interface StatePageProps {
	stateSlug: StateSlug;
}

const StatePage = ({ stateSlug }: StatePageProps) => {
	const { data, status } = useCounties(stateSlug);

	if (status !== "success") {
		return <LoadingSpinner />;
	}

	const {
		state: { name: state },
		counties,
	} = data;

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
				items={counties!.map(({ name, slug }) => ({
					label: name,
					path: countyRoute({ stateSlug, countySlug: slug }),
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

	return <StatePage stateSlug={stateSlug as StateSlug} />;
};

export default RoutedStatePage;
