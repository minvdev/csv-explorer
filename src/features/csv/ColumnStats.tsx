import StatusMessage from "@components/StatusMessage";

import columnStats from "./columnStats";
import type { CsvRow } from "./types";

interface ColumnStatsProps {
	header: string;
	rows: CsvRow[];
}

function ColumnStats({ header, rows }: ColumnStatsProps) {
	const stats = columnStats(rows, header);

	if (stats.kind === "non-numeric") {
		return <StatusMessage message={`«${header}»: columna sin datos numéricos`} tone="info" />;
	}

	return (
		<StatusMessage
			message={`«${header}»: Mín ${stats.min} · Máx ${stats.max} · Media ${stats.mean}`}
			tone="info"
		/>
	);
}

export default ColumnStats;
