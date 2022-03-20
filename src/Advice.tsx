import { useMemo } from "react";
import { getColor } from "./getColor";

export interface AdviceProps {
	testPositivityRate: number;
	casesPer100K: number;
}

export const Advice = ({ testPositivityRate, casesPer100K }: AdviceProps) => {
	const color = useMemo(
		() => getColor(testPositivityRate, casesPer100K),
		[testPositivityRate, casesPer100K],
	);
	return <p>YLE color code: {color}</p>;
};
