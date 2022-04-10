export type Color = "red" | "orange" | "yellow" | "blue";

export const getColor = (
	weeklyNewCasesPer100k: number | undefined,
	testPositivityRatio: number | undefined,
): Color => {
	if (
		(weeklyNewCasesPer100k != null && weeklyNewCasesPer100k >= 100) ||
		(testPositivityRatio != null && testPositivityRatio > 0.1)
	) {
		return "red";
	}
	if (
		(weeklyNewCasesPer100k != null && weeklyNewCasesPer100k >= 50) ||
		(testPositivityRatio != null && testPositivityRatio >= 0.08)
	) {
		return "orange";
	}
	if (
		(weeklyNewCasesPer100k != null && weeklyNewCasesPer100k >= 10) ||
		(testPositivityRatio != null && testPositivityRatio >= 0.05)
	) {
		return "yellow";
	}
	return "blue";
};
