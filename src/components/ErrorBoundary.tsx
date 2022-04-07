import { Center } from "@chakra-ui/react";
import React from "react";

type ErrorBoundaryProps = React.PropsWithChildren<{}>;

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	{ hasError: boolean }
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: unknown) {
		console.error(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<Center
					fontSize="2xl"
					position="absolute"
					top="0"
					left="0"
					height="100vh"
					width="100vw"
				>
					Something went wrong!
				</Center>
			);
		}
		return this.props.children;
	}
}
