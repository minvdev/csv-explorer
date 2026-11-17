import { createContext } from "react";

export type StatusTone = "info" | "warning" | "error";

export type StatusId = number;

export interface StatusEntry {
	id: StatusId;
	message: string;
	tone: StatusTone;
}

export interface StatusContextValue {
	statuses: StatusEntry[];
	showStatus: (message: string, tone: StatusTone) => StatusId;
	removeStatus: (id: StatusId) => void;
	clearStatuses: () => void;
}

export const StatusContext = createContext<StatusContextValue | null>(null);
