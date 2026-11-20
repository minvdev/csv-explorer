import { useRef, useState, type ReactNode } from "react";

import { StatusContext, type StatusEntry } from "./StatusContext";

function StatusProvider({ children }: { children: ReactNode }) {
	const [statuses, setStatuses] = useState<StatusEntry[]>([]);
	const nextIdRef = useRef(0);

	const showStatus = (message: string, tone: StatusEntry["tone"], dismissible = false) => {
		const id = nextIdRef.current;
		nextIdRef.current += 1;
		setStatuses((current) => [...current, { dismissible, id, message, tone }]);
		return id;
	};

	const removeStatus = (id: StatusEntry["id"]) => {
		setStatuses((current) => current.filter((status) => status.id !== id));
	};

	const clearStatuses = () => {
		setStatuses([]);
	};

	return (
		<StatusContext.Provider value={{ clearStatuses, removeStatus, showStatus, statuses }}>
			{children}
		</StatusContext.Provider>
	);
}

export default StatusProvider;
