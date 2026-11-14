import { useMemo, useState } from "react";

import StatusMessage from "@components/StatusMessage";
import FileSelector from "@features/csv/FileSelector";
import filterRows from "@features/csv/filterRows";
import PaginatedDataTable from "@features/csv/PaginatedDataTable";
import parseCsv, { CsvParseError } from "@features/csv/parseCsv";
import SearchBar from "@features/csv/SearchBar";
import type { CsvData } from "@features/csv/types";

const ERROR_MESSAGES: Record<CsvParseError["kind"], string> = {
	empty: "El archivo está vacío o no contiene datos",
	invalid: "El archivo no tiene un formato CSV válido",
};

type LoadStatus =
	| { kind: "idle" }
	| { kind: "loading" }
	| { kind: "error"; message: string }
	| { kind: "success"; data: CsvData };

function countMessage(rows: number, columns: number): string {
	return `${rows} ${rows === 1 ? "fila" : "filas"}, ${columns} ${columns === 1 ? "columna" : "columnas"}`;
}

function App() {
	const [status, setStatus] = useState<LoadStatus>({ kind: "idle" });
	const [query, setQuery] = useState("");

	const handleFileSelected = async (file: File) => {
		setStatus({ kind: "loading" });
		setQuery("");

		let text: string;
		try {
			text = await file.text();
		} catch {
			setStatus({ kind: "error", message: "No se ha podido leer el archivo" });
			return;
		}

		try {
			setStatus({ kind: "success", data: await parseCsv(text) });
		} catch (caught) {
			const message =
				caught instanceof CsvParseError
					? ERROR_MESSAGES[caught.kind]
					: "Se ha producido un error inesperado";
			setStatus({ kind: "error", message });
		}
	};

	const data = status.kind === "success" ? status.data : null;
	const filteredRows = useMemo(() => (data ? filterRows(data.rows, query) : []), [data, query]);
	const searching = query.trim() !== "";
	const hasWarnings = data !== null && data.warnings.length > 0;

	return (
		<>
			<FileSelector onFileSelected={handleFileSelected} />
			{status.kind === "loading" && <StatusMessage message="Cargando archivo…" tone="info" />}
			{status.kind === "error" && <StatusMessage message={status.message} tone="error" />}
			{data && (
				<>
					<SearchBar onChange={setQuery} value={query} />
					{hasWarnings && (
						<StatusMessage
							message="El archivo tiene un formato CSV irregular: se han aplicado correcciones automáticas que pueden no coincidir con los datos originales"
							tone="warning"
						/>
					)}
					{searching ? (
						<StatusMessage
							message={`${filteredRows.length} de ${data.rows.length} filas`}
							tone="info"
						/>
					) : (
						<StatusMessage
							message={countMessage(data.rows.length, data.headers.length)}
							tone="info"
						/>
					)}
					{filteredRows.length > 0 ? (
						<PaginatedDataTable
							data={{
								headers: data.headers,
								rows: filteredRows,
								warnings: data.warnings,
							}}
						/>
					) : (
						<StatusMessage message="Sin resultados" tone="info" />
					)}
				</>
			)}
		</>
	);
}

export default App;
