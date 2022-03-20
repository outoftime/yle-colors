import { Populations } from "./usePopulations";
import { useTestData } from "./useTestData";

export interface ResultsProps {
	currentCounty: string;
	populations: Populations;
}

export const Results = ({ currentCounty, populations }: ResultsProps) => {
	const { data: testData } = useTestData();

	if (testData == null) {
		return null;
	}

	const { positivesLast7Days, testsLast7Days } = testData[currentCounty];
	const population = populations[currentCounty];

	const positiveRate = positivesLast7Days / testsLast7Days;
	const casesPer100K = Math.round(positivesLast7Days / (population / 100000));

	return (
		<div>
			<p>
				Test positive rate:{" "}
				{positiveRate.toLocaleString("en-US", {
					style: "percent",
					maximumFractionDigits: 1,
				})}
			</p>
			<p>Cases per 100K: {casesPer100K}</p>
		</div>
	);
};
