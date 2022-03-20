import { useMemo } from "react";
import { Color, getColor } from "./getColor";

const adviceByColor: Record<
	Color,
	{
		maskIndoors: boolean;
		symptomaticAntigenTesting: string;
		exposure: string;
		crowdedIndoorSpaces?: number;
		flying: boolean;
		vulnerable?: "extra-vigilant" | "vigilant";
		indoorDining: boolean;
		indoorExercise: boolean;
	}
> = {
	red: {
		maskIndoors: true,
		symptomaticAntigenTesting:
			"Positive? Trust result. Negative? Retest in 24 hours.",
		exposure:
			"Not boosted? Quarantine for 5 days. Boosted? No quarantine, test 5 days after exposure.",
		crowdedIndoorSpaces: 100,
		flying: false,
		vulnerable: "extra-vigilant",
		indoorDining: false,
		indoorExercise: false,
	},
	orange: {
		maskIndoors: true,
		symptomaticAntigenTesting:
			"Positive? Trust result. Negative? Retest in 24 hours.",
		exposure:
			"Not boosted? Quarantine for 5 days. Boosted? No quarantine, test 5 days after exposure.",
		crowdedIndoorSpaces: 75,
		flying: true,
		vulnerable: "vigilant",
		indoorDining: true,
		indoorExercise: true,
	},
	yellow: {
		maskIndoors: false,
		symptomaticAntigenTesting: "Positive or negative? Retest in 24 hours.",
		exposure:
			"Not boosted? Quarantine for 5 days. Boosted? No quarantine, test 5 days after exposure.",
		flying: true,
		vulnerable: "vigilant",
		indoorDining: true,
		indoorExercise: true,
	},
	blue: {
		maskIndoors: false,
		symptomaticAntigenTesting:
			"Negative? Trust result. Positive? Retest in 24 hours.",
		exposure: "No quarantine, test 5 days after exposure.",
		flying: true,
		indoorDining: true,
		indoorExercise: true,
	},
};

export interface AdviceProps {
	testPositivityRate: number;
	casesPer100K: number;
}

export const Advice = ({ testPositivityRate, casesPer100K }: AdviceProps) => {
	const color = useMemo(
		() => getColor(testPositivityRate, casesPer100K),
		[testPositivityRate, casesPer100K],
	);

	const {
		maskIndoors,
		symptomaticAntigenTesting,
		exposure,
		crowdedIndoorSpaces,
		flying,
		vulnerable,
		indoorDining,
		indoorExercise,
	} = adviceByColor[color];

	return (
		<>
			<h2>YLE color code: {color}</h2>
			<ul>
				<li>{maskIndoors ? "Mask indoors." : "No need to mask indoors."}</li>
				<li>Symptomatic antigen testing: {symptomaticAntigenTesting}</li>
				<li>If exposed: {exposure}</li>
				{crowdedIndoorSpaces != null && (
					<li>
						Avoid indoor, crowded public areas where not {crowdedIndoorSpaces}%
						masked and vaccination status unknown.
					</li>
				)}
				<li>{flying ? "Flying OK." : "Avoid flying, if possible."}</li>
				{vulnerable != null && (
					<li>Be {vulnerable} around vulnerable, like grandparents.</li>
				)}
				<li>{indoorDining ? "Indoor dining OK" : "Avoid indoor dining"}</li>
				{!indoorExercise && (
					<li>
						Avoid indoor high-exertion public activities, like trampoline parks
					</li>
				)}
			</ul>
		</>
	);
};
