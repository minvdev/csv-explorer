import { useEffect, useMemo, useState } from "react";

import columnStats from "./columnStats";
import observeTruncation from "./observeTruncation";
import type { CsvRow } from "./types";

interface ColumnDetailsContentProps {
	column: string;
	rows: CsvRow[];
	headerText: Element;
}

const LABEL_TONE = "text-xs uppercase tracking-wide text-gray-500";
const VALUE_TONE = "font-mono text-sm text-gray-900";

function ColumnDetailsContent({ column, rows, headerText }: ColumnDetailsContentProps) {
	const stats = useMemo(() => columnStats(rows, column), [rows, column]);
	const [truncated, setTruncated] = useState(false);
	useEffect(() => observeTruncation(headerText, setTruncated), [headerText]);
	return (
		<>
			{truncated && <p className="wrap-anywhere whitespace-pre-wrap">{column}</p>}
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
		</>
	);
}

export default ColumnDetailsContent;
