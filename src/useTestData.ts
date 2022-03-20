import { parse, subDays } from "date-fns";
import groupBy from "lodash.groupby";
import maxBy from "lodash.maxby";
import { nextTick } from "process";
import { useMemo } from "react";
import { useQuery } from "react-query";

interface NewYorkCovidTestingResponse {
	test_date: string;
	county: string;
	new_positives: string;
	cumulative_number_of_positives: string;
	total_number_of_tests: string;
	cumulative_number_of_tests: string;
}

interface TestingDataRow {
	date: Date;
	county: string;
	positives: number;
	tests: number;
}

interface TestData {
	positivesLast7Days: number;
	testsLast7Days: number;
}

const castDataRow = (
	rawDataRow: NewYorkCovidTestingResponse,
): TestingDataRow => ({
	date: parse(rawDataRow.test_date, "yyyy-MM-dd'T'HH:mm:ss:SSS", new Date()),
	county: rawDataRow.county,
	positives: Number(rawDataRow.new_positives),
	tests: Number(rawDataRow.total_number_of_tests),
});

const aggregateTestData = (
	rawData: NewYorkCovidTestingResponse[],
): { [county: string]: TestData } => {
	const data = rawData.map(castDataRow);
	const endDate = maxBy(data, "date")!.date;
	const startDate = subDays(endDate, 7);
	const testData: { [county: string]: TestData } = {};

	for (const { date, county, positives, tests } of data) {
		if (date < startDate) {
			continue;
		}
		if (!(county in testData)) {
			testData[county] = { positivesLast7Days: 0, testsLast7Days: 0 };
		}
		testData[county].positivesLast7Days += positives;
		testData[county].testsLast7Days += tests;
	}

	return testData;
};

export const useTestData = () => {
	const { data, isLoading, error } = useQuery(
		"NewYorkCovidTesting",
		async (): Promise<NewYorkCovidTestingResponse[]> => {
			const response = await fetch(
				"https://health.data.ny.gov/resource/xdss-u53e.json",
				{
					method: "GET",
					headers: {
						"X-App-Token": "xGzkzivvgpxWhiBxi55htQH7B",
					},
				},
			);
			return response.json();
		},
	);

	const dataByCounty = useMemo(
		() => (data == null ? null : aggregateTestData(data)),
		[data],
	);

	return { data: dataByCounty, isLoading, error };
};
