import { useState } from "react";

import StatusMessage from "@components/StatusMessage";
import DataTable from "@features/csv/DataTable";
import FileSelector from "@features/csv/FileSelector";
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
	| { kind: "success"; data: CsvData };

function App() {
	const [status, setStatus] = useState<LoadStatus>({ kind: "idle" });

	const handleFileSelected = async (file: File) => {
		setStatus({ kind: "loading" });

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

	return (
		<>
			<FileSelector onFileSelected={handleFileSelected} />
			{status.kind === "loading" && <StatusMessage message="Cargando archivo…" tone="info" />}
			{status.kind === "error" && <StatusMessage message={status.message} tone="error" />}
			{status.kind === "success" && <DataTable data={status.data} />}
		</>
	);
}

export default App;
