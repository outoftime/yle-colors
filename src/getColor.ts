export type Color = "red" | "orange" | "yellow" | "blue";

export const getColor = (
	casesPer100K: number,
	testPositivityRate: number | undefined,
): Color => {
	if (
		casesPer100K >= 100 ||
		(testPositivityRate != null && testPositivityRate > 0.1)
	) {
		return "red";
	}
	if (
		casesPer100K >= 50 ||
		(testPositivityRate != null && testPositivityRate >= 0.08)
	) {
		return "orange";
	}
	if (
		casesPer100K >= 10 ||
		(testPositivityRate != null && testPositivityRate >= 0.05)
	) {
		return "yellow";
	}
	return "blue";
};
