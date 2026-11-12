import { useState } from "react";

import DataTable from "@features/csv/DataTable";
import FileSelector from "@features/csv/FileSelector";
import parseCsv, { CsvParseError } from "@features/csv/parseCsv";
import type { CsvData } from "@features/csv/types";

const ERROR_MESSAGES: Record<CsvParseError["kind"], string> = {
	empty: "El archivo está vacío",
	invalid: "El archivo no tiene un formato CSV válido",
};

function App() {
	const [data, setData] = useState<CsvData | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleFileSelected = async (file: File) => {
		setData(null);
		setError(null);

		let text: string;
		try {
			text = await file.text();
		} catch {
			setError("No se ha podido leer el archivo");
			return;
		}

		try {
			setData(parseCsv(text));
		} catch (caught) {
			if (caught instanceof CsvParseError) {
				setError(ERROR_MESSAGES[caught.kind]);
			} else {
				setError("Se ha producido un error inesperado");
			}
		}
	};

	return (
		<>
			<FileSelector onFileSelected={handleFileSelected} />
			{data && <DataTable data={data} />}
			{error && (
				<p role="alert" className="mt-2 text-sm text-red-600">
					{error}
				</p>
			)}
		</>
	);
}

export default App;
