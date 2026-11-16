import { useMemo, useState } from "react";

import StatusMessage from "@components/StatusMessage";
import Toolbar from "@components/toolbar/Toolbar";
import filterRows from "@features/csv/filterRows";
import PaginatedDataTable from "@features/csv/PaginatedDataTable";
import parseCsv, { CsvParseError } from "@features/csv/parseCsv";
import type { CsvData } from "@features/csv/types";

const ERROR_MESSAGES: Record<CsvParseError["kind"], string> = {
	empty: "El archivo está vacío o no contiene datos",
	invalid: "El archivo no tiene un formato CSV válido",
};

type LoadStatus =
	| { kind: "idle" }
	| { kind: "loading" }
	| { kind: "error"; message: string }
	| { kind: "success"; data: CsvData; fileName: string };

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
			setStatus({ kind: "success", data: await parseCsv(text), fileName: file.name });
		} catch (caught) {
			const message =
				caught instanceof CsvParseError
					? ERROR_MESSAGES[caught.kind]
					: "Se ha producido un error inesperado";
			setStatus({ kind: "error", message });
		}
	};

	const data = status.kind === "success" ? status.data : null;
	const fileName = status.kind === "success" ? status.fileName : null;
	const filteredRows = useMemo(() => (data ? filterRows(data.rows, query) : []), [data, query]);
	const hasWarnings = data !== null && data.warnings.length > 0;

	return (
		<div className="flex h-dvh flex-col">
			<Toolbar
				columns={data?.headers.length ?? 0}
				fileName={fileName}
				onFileSelected={handleFileSelected}
				onQueryChange={setQuery}
				query={query}
				shownRows={data ? filteredRows.length : 0}
				totalRows={data?.rows.length ?? 0}
			/>
			<main className="min-h-0 flex-1 overflow-y-auto">
				{status.kind === "loading" && (
					<StatusMessage message="Cargando archivo…" tone="info" />
				)}
				{status.kind === "error" && <StatusMessage message={status.message} tone="error" />}
				{data && (
					<>
						{hasWarnings && (
							<StatusMessage
								message="El archivo tiene un formato CSV irregular: se han aplicado correcciones automáticas que pueden no coincidir con los datos originales"
								tone="warning"
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
			</main>
		</div>
	);
}

export default App;
