import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { Color } from "../lib/getColor";

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
	color: Color;
}

const WarningListIcon = () => <ListIcon as={WarningIcon} color="red.500" />;

const InfoListIcon = () => <ListIcon as={InfoIcon} color="blue.500" />;

const BooleanListIcon = ({ isWarning }: { isWarning: boolean }) => {
	if (isWarning) {
		return <WarningListIcon />;
	}
	return <ListIcon as={CheckCircleIcon} color="green.500" />;
};

export const Advice = ({ color }: AdviceProps) => {
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
		<List>
			<ListItem>
				<BooleanListIcon isWarning={maskIndoors} />
				{maskIndoors ? "Mask indoors." : "No need to mask indoors."}
			</ListItem>
			<ListItem>
				<InfoListIcon />
				Symptomatic antigen testing: {symptomaticAntigenTesting}
			</ListItem>
			<ListItem>
				<InfoListIcon />
				If exposed: {exposure}
			</ListItem>
			{crowdedIndoorSpaces != null && (
				<ListItem>
					<WarningListIcon />
					Avoid indoor, crowded public areas where not {crowdedIndoorSpaces}%
					masked and vaccination status unknown.
				</ListItem>
			)}
			<ListItem>
				<BooleanListIcon isWarning={!flying} />
				{flying ? "Flying OK." : "Avoid flying, if possible."}
			</ListItem>
			{vulnerable != null && (
				<ListItem>
					<WarningListIcon />
					Be {vulnerable} around vulnerable, like grandparents.
				</ListItem>
			)}
			<ListItem>
				<BooleanListIcon isWarning={!indoorDining} />
				{indoorDining ? "Indoor dining OK" : "Avoid indoor dining"}
			</ListItem>
			{!indoorExercise && (
				<ListItem>
					<WarningListIcon />
					Avoid indoor high-exertion public activities, like trampoline parks
				</ListItem>
			)}
		</List>
	);
};
