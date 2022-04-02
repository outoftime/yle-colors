import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCaseRate } from "../../hooks/api-data";
import { DataPoint, Results } from "../../components/Results";
import { useTestData } from "../../hooks/useTestData";
import { parseISO } from "date-fns";
import { countyRoute, homeRoute, stateRoute } from "../../lib/routes";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const County: NextPage = () => {
	const router = useRouter();
	const { stateSlug, countySlug } = router.query;

	const state = `${stateSlug}`.replace("-", " ");
	const county = `${countySlug}`.replace("-", " ");

	const {
		caseRate,
		isLoading: isCaseRateLoading,
		error: caseRateError,
	} = useCaseRate(state, county);

	// FIXME this is a temporary holdover from my first draft of this project
	// which only pulled data from the NY state API. This data should be cached
	// and served by the app’s API, and it should be easy to add other states.
	const isTestDataAvailable = state === "New York";
	const {
		data: testResults,
		isLoading: isTestResultsLoading,
		error: testResultsError,
	} = useTestData({ enabled: isTestDataAvailable });

	const error = caseRateError ?? testResultsError;

	if (error != null) {
		throw error;
	}

	if (isCaseRateLoading || isTestResultsLoading || caseRate == null) {
		return <div>Loading…</div>;
	}

	const casesPer100K: DataPoint = {
		value: Number(caseRate["7_day_cases_per_100k"]),
		date: new Date(parseISO(caseRate.date)),
	};

	const testPositivityRate =
		testResults?.[county] == null
			? undefined
			: {
					value:
						testResults[county].positivesLast7Days /
						testResults[county].testsLast7Days,
					date: testResults[county].endDate,
			  };

	return (
		<>
			<Breadcrumbs
				items={[
					{ label: "Home", href: homeRoute() },
					{ label: state, href: stateRoute({ state }) },
					{ label: county },
				]}
			/>
			<Results
				county={county}
				casesPer100K={casesPer100K}
				testPositivityRate={testPositivityRate}
			/>
		</>
	);
};

export default County;
