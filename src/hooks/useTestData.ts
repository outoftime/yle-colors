import { subDays } from "date-fns";
import maxBy from "lodash.maxby";
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

type TestingDataRow = {
	date: Date;
	county: string;
	positives: number;
	tests: number;
};

export type TestData = {
	positivesLast7Days: number;
	testsLast7Days: number;
	endDate: Date;
};

const castDataRow = (
	rawDataRow: NewYorkCovidTestingResponse,
): TestingDataRow => ({
	date: new Date(Date.parse(rawDataRow.test_date)),
	county: rawDataRow.county,
	positives: Number(rawDataRow.new_positives),
	tests: Number(rawDataRow.total_number_of_tests),
});

const aggregateTestData = (rawData: NewYorkCovidTestingResponse[]) => {
	const data = rawData.map(castDataRow);

	const endDate = maxBy(data, "date")!.date;
	const startDate = subDays(endDate, 7);
	const testData: { [county: string]: TestData } = {};

	for (const { date, county, positives, tests } of data) {
		if (date <= startDate) {
			continue;
		}
		if (!(county in testData)) {
			testData[county] = { endDate, positivesLast7Days: 0, testsLast7Days: 0 };
		}
		testData[county].positivesLast7Days += positives;
		testData[county].testsLast7Days += tests;
	}

	return testData;
};

export const useTestData = ({ enabled }: { enabled: boolean }) => {
	const { data, isLoading } = useQuery(
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
		{ enabled },
	);

	const aggregateData = useMemo(
		() => (data == null ? null : aggregateTestData(data)),
		[data],
	);

	return { data: aggregateData, isLoading };
};
