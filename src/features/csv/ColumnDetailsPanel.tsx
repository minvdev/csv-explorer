import { useEffect, useMemo, useRef } from "react";

import columnStats from "./columnStats";
import type { CsvRow } from "./types";

interface ColumnDetailsPanelProps {
	column: string;
	rows: CsvRow[];
	onClose: () => void;
}

const LABEL_TONE = "text-xs uppercase tracking-wide text-gray-500";
const VALUE_TONE = "font-mono text-sm text-gray-900";
export const COLUMN_DETAILS_PANEL_ID = "column-details-panel";

function ColumnDetailsPanel({ column, rows, onClose }: ColumnDetailsPanelProps) {
	const stats = useMemo(() => columnStats(rows, column), [rows, column]);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		closeButtonRef.current?.focus();
	}, [column]);

	return (
		<aside
			aria-label={`Detalles de la columna ${column}`}
			className="flex w-72 shrink-0 flex-col overflow-y-auto border-l border-orange-100 bg-white text-sm max-sm:absolute max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-20 max-sm:max-h-1/2 max-sm:w-full max-sm:border-t max-sm:border-l-0 max-sm:shadow-lg"
			id={COLUMN_DETAILS_PANEL_ID}
		>
			<div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-orange-100 bg-orange-50 px-4">
				<h2 className="min-w-0 truncate font-semibold text-gray-700" title={column}>
					{column}
				</h2>
				<button
					aria-label="Cerrar detalles"
					className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded text-lg text-gray-500 hover:bg-orange-100 hover:text-orange-700 max-sm:size-10"
					onClick={onClose}
					ref={closeButtonRef}
					type="button"
				>
					×
				</button>
			</div>
			<div className="flex flex-col gap-4 p-4">
				<p className="text-xs text-gray-500">
					{rows.length} fila{rows.length > 1 && "s"} visibles
				</p>
				{stats.kind === "numeric" ? (
					<dl className="flex flex-col gap-3">
						<div className="flex flex-col gap-0.5">
							<dt className={LABEL_TONE}>Mínimo</dt>
							<dd className={VALUE_TONE}>{stats.min}</dd>
						</div>
						<div className="flex flex-col gap-0.5">
							<dt className={LABEL_TONE}>Máximo</dt>
							<dd className={VALUE_TONE}>{stats.max}</dd>
						</div>
						<div className="flex flex-col gap-0.5">
							<dt className={LABEL_TONE}>Media</dt>
							<dd className={VALUE_TONE}>{stats.mean}</dd>
						</div>
					</dl>
				) : (
					<p className="text-gray-600">Esta columna no tiene datos numéricos</p>
				)}
			</div>
		</aside>
	);
}

export default ColumnDetailsPanel;
