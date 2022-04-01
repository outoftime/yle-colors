import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCaseRate } from "../../hooks/api-data";
import { DataPoint, Results } from "../../Results";

const County: NextPage = () => {
	const router = useRouter();
	const { stateSlug, countySlug } = router.query;

	const state = `${stateSlug}`.replace("-", " ");
	const county = `${countySlug}`.replace("-", " ");

	const { caseRate, isLoading, isError, error } = useCaseRate(state, county);

	if (isError) {
		throw error;
	}

	if (isLoading || caseRate == null) {
		return <div>Loading…</div>;
	}

	const casesPer100K: DataPoint = {
		value: Number(caseRate["7_day_cases_per_100k"]),
		date: new Date(Date.parse(caseRate.date)),
	};

	return <Results state={state} county={county} casesPer100K={casesPer100K} />;
};

export default County;
