import { parseISO } from "date-fns";
import { useQuery } from "react-query";
import type { CountySlug, StateSlug } from "../lib/routes";

const API_ROOT = "https://api.yourlocalcovidprecautions.com/countries/us";

type StatesResult = {
	states: {
		name: string;
		slug: StateSlug;
	}[];
};

type CountiesResult = {
	state: { name: string };
	counties: {
		name: string;
		slug: CountySlug;
	}[];
};

type CountyMetricsResult = {
	state: { name: string };
	county: { name: string };
	metrics: {
		date: string;
		weekly_new_cases_per_100k: number;
		test_positivity_ratio: number;
		vaccinations_completed_ratio: number;
	};
};

type TransformedCountyMetricsResult = {
	state: { name: string };
	county: { name: string };
	metrics: {
		date: Date;
		weeklyNewCasesPer100k: number;
		testPositivityRatio: number;
		vaccinationsCompletedRatio: number;
	};
};

export const useStates = () =>
	useQuery<StatesResult>(["states"], async () =>
		(await fetch(`${API_ROOT}/states`)).json(),
	);

export const useCounties = (stateSlug: StateSlug) =>
	useQuery<CountiesResult>(["counties", stateSlug], async () =>
		(await fetch(`${API_ROOT}/states/${stateSlug}/counties`)).json(),
	);

export const useCountyMetrics = (
	stateSlug: StateSlug,
	countySlug: CountySlug,
) =>
	useQuery<CountyMetricsResult, unknown, TransformedCountyMetricsResult>(
		["countyMetrics", stateSlug, countySlug],
		async () =>
			(
				await fetch(
					`${API_ROOT}/states/${stateSlug}/counties/${countySlug}/metrics`,
				)
			).json(),
		{
			select: ({ state, county, metrics }) => ({
				state,
				county,
				metrics: {
					date: new Date(parseISO(metrics.date)),
					weeklyNewCasesPer100k: metrics.weekly_new_cases_per_100k,
					testPositivityRatio: metrics.test_positivity_ratio,
					vaccinationsCompletedRatio: metrics.vaccinations_completed_ratio,
				},
			}),
		},
	);
