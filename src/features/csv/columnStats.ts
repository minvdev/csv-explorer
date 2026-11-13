import type { CsvRow } from "./types";

export type ColumnStats =
	| { kind: "numeric"; min: number; max: number; mean: number }
	| { kind: "non-numeric" };

export function normalizeNumber(value: string): number | null {
	const normalized = value.trim().replace(",", ".");
	if (normalized === "") {
		return null;
	}
	const parsed = Number(normalized);
	return Number.isFinite(parsed) ? parsed : null;
}

function columnStats(rows: CsvRow[], header: string): ColumnStats {
	const numbers: number[] = [];

	for (const row of rows) {
		const cell = row[header] ?? "";
		if (cell.trim() === "") {
			continue;
		}
		const parsed = normalizeNumber(cell);
		if (parsed === null) {
			return { kind: "non-numeric" };
		}
		numbers.push(parsed);
	}

	if (numbers.length === 0) {
		return { kind: "non-numeric" };
	}

	const min = numbers.reduce((a, b) => Math.min(a, b));
	const max = numbers.reduce((a, b) => Math.max(a, b));
	const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;

	return { kind: "numeric", min, max, mean: Math.round(mean * 100) / 100 };
}

export default columnStats;
