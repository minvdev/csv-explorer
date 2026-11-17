import type { CsvRow } from "./types";

export function normalizeText(text: string): string {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

function rowMatches(row: CsvRow, needle: string): boolean {
	return Object.values(row).some((cell) => normalizeText(cell ?? "").includes(needle));
}

function filterRows(rows: CsvRow[], query: string): CsvRow[] {
	const needle = normalizeText(query.trim());
	if (needle === "") {
		return rows;
	}
	return rows.filter((row) => rowMatches(row, needle));
}

export function hasResults(rows: CsvRow[], query: string): boolean {
	const needle = normalizeText(query.trim());
	if (needle === "") {
		return rows.length > 0;
	}
	return rows.some((row) => rowMatches(row, needle));
}

export default filterRows;
