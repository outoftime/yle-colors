import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCountyMetrics } from "../../../hooks/api-data";
import { Results } from "../../../components/Results";
import { homeRoute, stateRoute } from "../../../lib/routes";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Head from "next/head";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Intro } from "../../../components/Intro";
import { Divider } from "@chakra-ui/react";
import { CountySlug, StateSlug } from "../../../lib/routes";

const CountyPage = ({
	stateSlug,
	countySlug,
}: {
	stateSlug: StateSlug;
	countySlug: CountySlug;
}) => {
	const { data, status } = useCountyMetrics(stateSlug, countySlug);

	if (status !== "success") {
		return <div>Loading…</div>;
	}

	const {
		state: { name: state },
		county: { name: county },
		metrics: { date, weeklyNewCasesPer100k, testPositivityRatio },
	} = data;

	return (
		<>
			<Head>
				<title>
					Your Local COVID Precautions | {county}, {state}
				</title>
			</Head>
			<Breadcrumbs
				items={[
					{ label: "Home", href: homeRoute() },
					{ label: state, href: stateRoute({ stateSlug }) },
					{ label: county },
				]}
			/>
			<Results
				date={date}
				county={county}
				weeklyNewCasesPer100k={weeklyNewCasesPer100k}
				testPositivityRatio={testPositivityRatio}
			/>
			<Divider my="5" />
			<Intro />
		</>
	);
};

const RoutedCountyPage: NextPage = () => {
	const router = useRouter();
	const { stateSlug, countySlug } = router.query;

	if (typeof stateSlug != "string" || typeof countySlug != "string") {
		return <LoadingSpinner />;
	}

	return (
		<CountyPage
			stateSlug={stateSlug as StateSlug}
			countySlug={countySlug as CountySlug}
		/>
	);
};

export default RoutedCountyPage;
