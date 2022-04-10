export const homeRoute = () => "/";

const stateSlugBrand: unique symbol = Symbol();
export type StateSlug = string & {
	[stateSlugBrand]: never;
};

const countySlugBrand: unique symbol = Symbol();
export type CountySlug = string & {
	[countySlugBrand]: never;
};

export const stateRoute = ({ stateSlug }: { stateSlug: StateSlug }) =>
	`/us/${stateSlug}`;

export const countyRoute = ({
	stateSlug,
	countySlug,
}: {
	stateSlug: StateSlug;
	countySlug: CountySlug;
}) => `/us/${stateSlug}/${countySlug}`;
