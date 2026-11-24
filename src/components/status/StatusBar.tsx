import { useEffect, useState } from "react";

import type { StatusTone } from "./StatusContext";
import { useStatus } from "./useStatus";

const BAND_TONE = "flex min-h-12 shrink-0 items-center gap-3 px-4 py-2 text-sm";

const CLASS_BY_TONE: Record<StatusTone, string> = {
	info: "bg-gray-100 text-gray-600",
	warning: "bg-orange-100 text-orange-700",
	error: "bg-red-100 text-red-700",
};

function Announcement({ message }: { message: string }) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		// Let the file dialog release focus before publishing its result.
		const timer = window.setTimeout(() => setReady(true), 150);
		return () => window.clearTimeout(timer);
	}, []);

	return ready ? <p>{message}</p> : null;
}

function StatusBar() {
	const { removeStatus, statuses } = useStatus();

	return (
		<>
			<div
				aria-atomic="false"
				aria-live="polite"
				aria-relevant="additions"
				className="sr-only"
			>
				{statuses
					.filter((status) => status.tone !== "error")
					.map((status) => (
						<Announcement key={status.id} message={status.message} />
					))}
			</div>
			<div role="alert" aria-atomic="false" aria-relevant="additions" className="sr-only">
				{statuses
					.filter((status) => status.tone === "error")
					.map((status) => (
						<Announcement key={status.id} message={status.message} />
					))}
			</div>
			{statuses.map((status) => (
				<p className={`${BAND_TONE} ${CLASS_BY_TONE[status.tone]}`} key={status.id}>
					{status.message}
					{status.dismissible && (
						<button
							aria-label="Cerrar mensaje"
							className="ml-auto flex size-5 shrink-0 cursor-pointer items-center justify-center rounded text-base leading-none hover:bg-black/10"
							type="button"
							onClick={() => removeStatus(status.id)}
						>
							×
						</button>
					)}
				</p>
			))}
		</>
	);
}

export default StatusBar;
