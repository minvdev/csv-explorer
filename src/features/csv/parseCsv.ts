import Papa from "papaparse";

import type { CsvData, CsvRow } from "./types";

export type CsvParseErrorKind = "empty" | "invalid";

export class CsvParseError extends Error {
	kind: CsvParseErrorKind;

	constructor(kind: CsvParseErrorKind, message: string) {
		super(message);
		this.name = "CsvParseError";
		this.kind = kind;
	}
}

function parseCsv(text: string): CsvData {
	if (text.trim() === "") {
		throw new CsvParseError("empty", "The file is empty");
	}

	const results = Papa.parse<CsvRow>(text, {
		header: true,
		skipEmptyLines: true,
	});

	if (results.errors.length > 0) {
		throw new CsvParseError("invalid", `invalid CSV: ${results.errors[0].message}`);
	}

	if (!results.meta.fields || results.data.length === 0) {
		throw new CsvParseError("empty", "The CSV file does not contain rows");
	}

	return { headers: results.meta.fields, rows: results.data };
}

export default parseCsv;
