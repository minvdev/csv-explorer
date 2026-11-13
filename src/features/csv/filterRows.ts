import type { CsvRow } from "./types";

export function normalizeText(text: string): string {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

function filterRows(rows: CsvRow[], query: string): CsvRow[] {
	const needle = normalizeText(query.trim());
	if (needle === "") {
		return rows;
	}
	return rows.filter((row) =>
		Object.values(row).some((cell) => normalizeText(cell ?? "").includes(needle)),
	);
}

export default filterRows;
