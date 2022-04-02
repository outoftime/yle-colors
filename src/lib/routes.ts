const toSegment = (str: string) => str.replace(" ", "-");

export const homeRoute = () => "/";

export const stateRoute = ({ state }: { state: string }) =>
	`/${toSegment(state)}`;

export const countyRoute = ({
	state,
	county,
}: {
	state: string;
	county: string;
}) => `/${toSegment(state)}/${toSegment(county)}`;
