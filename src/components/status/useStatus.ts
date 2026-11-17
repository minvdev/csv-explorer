import { useContext } from "react";

import { StatusContext, type StatusContextValue } from "./StatusContext";

export function useStatus(): StatusContextValue {
	const context = useContext(StatusContext);
	if (context === null) {
		throw new Error("useStatus must be used inside of StatusProvider");
	}
	return context;
}
