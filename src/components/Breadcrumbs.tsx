import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";

type Item = {
	label: string;
	href?: string;
};

export interface BreadcrumbsProps {
	items: Item[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
	<Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
		{items.map(({ label, href }) =>
			href == null ? (
				<BreadcrumbItem key={href} isCurrentPage>
					<BreadcrumbLink isCurrentPage>{label}</BreadcrumbLink>
				</BreadcrumbItem>
			) : (
				<BreadcrumbItem key={href}>
					<BreadcrumbLink href={href} as={Link}>
						{label}
					</BreadcrumbLink>
				</BreadcrumbItem>
			),
		)}
	</Breadcrumb>
);
