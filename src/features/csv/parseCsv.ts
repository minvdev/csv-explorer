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

function parseCsv(text: string): Promise<CsvData> {
	return new Promise((resolve, reject) => {
		if (text.trim() === "") {
			reject(new CsvParseError("empty", "The file is empty"));
			return;
		}

		Papa.parse<CsvRow>(text, {
			header: true,
			skipEmptyLines: true,
			worker: true,
			complete: (results) => {
				if (results.errors.length > 0) {
					reject(
						new CsvParseError("invalid", `invalid CSV: ${results.errors[0].message}`),
					);
					return;
				}

				if (!results.meta.fields || results.data.length === 0) {
					reject(new CsvParseError("empty", "The CSV file does not contain rows"));
					return;
				}

				resolve({ headers: results.meta.fields, rows: results.data });
			},
			error: (error: Error) => {
				reject(error);
			},
		});
	});
}

export default parseCsv;
