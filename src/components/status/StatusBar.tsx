import type { StatusTone } from "./StatusContext";
import { useStatus } from "./useStatus";

const BAND_TONE = "flex h-12 shrink-0 items-center px-4 text-sm";

const CLASS_BY_TONE: Record<StatusTone, string> = {
	info: "bg-gray-100 text-gray-600",
	warning: "bg-orange-100 text-orange-700",
	error: "bg-red-100 text-red-700",
};

const ROLE_BY_TONE: Record<StatusTone, string> = {
	info: "status",
	warning: "status",
	error: "alert",
};

function StatusBar() {
	const { removeStatus, statuses } = useStatus();

	if (statuses.length === 0) {
		return null;
	}

	return (
		<>
			{statuses.map((status) => (
				<p
					className={`${BAND_TONE} ${CLASS_BY_TONE[status.tone]}`}
					key={status.id}
					role={ROLE_BY_TONE[status.tone]}
				>
					{status.message}
					{status.dismissible && (
						<button
							aria-label="Cerrar mensaje"
							className="ml-auto cursor-pointer rounded px-1 text-base leading-none hover:bg-black/10"
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
