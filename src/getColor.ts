export type Color = "red" | "orange" | "yellow" | "blue";

export const getColor = (
	testPositivityRate: number,
	casesPer100K: number,
): Color => {
	if (testPositivityRate > 0.1 || casesPer100K >= 100) {
		return "red";
	}
	if (testPositivityRate >= 0.08 || casesPer100K >= 50) {
		return "orange";
	}
	if (testPositivityRate >= 0.05 || casesPer100K >= 10) {
		return "yellow";
	}
	return "blue";
};
