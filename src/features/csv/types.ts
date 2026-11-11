export type CsvRow = Record<string, string>;

export interface CsvData {
	headers: string[];
	rows: CsvRow[];
}
