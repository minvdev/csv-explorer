import { useMemo, useRef, useState } from "react";

import StatusBar from "@components/status/StatusBar";
import type { StatusId } from "@components/status/StatusContext";
import StatusProvider from "@components/status/StatusProvider";
import { useStatus } from "@components/status/useStatus";
import Toolbar from "@components/toolbar/Toolbar";
import { columnStatsMessage } from "@features/csv/columnStats";
import filterRows, { hasResults } from "@features/csv/filterRows";
import PaginatedDataTable from "@features/csv/PaginatedDataTable";
import parseCsv, { CsvParseError } from "@features/csv/parseCsv";
import type { CsvData } from "@features/csv/types";

const ERROR_MESSAGES: Record<CsvParseError["kind"], string> = {
	empty: "El archivo está vacío o no contiene datos",
	invalid: "El archivo no tiene un formato CSV válido",
};

const WARNING_MESSAGE =
	"El archivo tiene un formato CSV irregular: se han aplicado correcciones automáticas que pueden no coincidir con los datos originales";

interface LoadedFile {
	data: CsvData;
	fileName: string;
}

function App() {
	return (
		<StatusProvider>
			<Explorer />
		</StatusProvider>
	);
}

function Explorer() {
	const { clearStatuses, removeStatus, showStatus } = useStatus();
	const [loaded, setLoaded] = useState<LoadedFile | null>(null);
	const [query, setQuery] = useState("");
	const [selectedColumn, setSelectedColumn] = useState<{
		column: string;
		statusId: StatusId;
	} | null>(null);
	const noResultsIdRef = useRef<StatusId | null>(null);

	const filteredRows = useMemo(
		() => (loaded ? filterRows(loaded.data.rows, query) : []),
		[loaded, query],
	);

	const handleFileSelected = async (file: File) => {
		setSelectedColumn(null);
		setQuery("");
		clearStatuses();
		const loadingId = showStatus("Cargando archivo…", "info");

		try {
			const parsed = await parseCsv(await file.text());
			removeStatus(loadingId);
			setLoaded({ data: parsed, fileName: file.name });
			if (parsed.warnings.length > 0) {
				showStatus(WARNING_MESSAGE, "warning");
			}
		} catch (caught) {
			removeStatus(loadingId);
			setLoaded(null);
			showStatus(
				caught instanceof CsvParseError
					? ERROR_MESSAGES[caught.kind]
					: "No se ha podido cargar el archivo",
				"error",
			);
		}
	};

	const handleQueryChange = (value: string) => {
		setQuery(value);
		if (noResultsIdRef.current !== null) {
			removeStatus(noResultsIdRef.current);
			noResultsIdRef.current = null;
		}
		if (loaded !== null && !hasResults(loaded.data.rows, value)) {
			noResultsIdRef.current = showStatus("Sin resultados", "info");
		}
	};

	const handleSelectColumn = (column: string) => {
		if (selectedColumn !== null) {
			removeStatus(selectedColumn.statusId);
		}
		if (selectedColumn?.column === column) {
			setSelectedColumn(null);
			return;
		}
		setSelectedColumn({
			column,
			statusId: showStatus(columnStatsMessage(loaded?.data.rows ?? [], column), "info"),
		});
	};

	return (
		<div className="flex h-dvh flex-col">
			<Toolbar
				columns={loaded?.data.headers.length ?? 0}
				fileName={loaded?.fileName ?? null}
				onFileSelected={handleFileSelected}
				onQueryChange={handleQueryChange}
				query={query}
				shownRows={loaded ? filteredRows.length : 0}
				totalRows={loaded?.data.rows.length ?? 0}
			/>
			<StatusBar />
			<main className="min-h-0 flex-1 overflow-y-auto">
				{loaded && filteredRows.length > 0 && (
					<PaginatedDataTable
						data={{
							headers: loaded.data.headers,
							rows: filteredRows,
							warnings: loaded.data.warnings,
						}}
						onSelectColumn={handleSelectColumn}
						selectedColumn={selectedColumn?.column ?? null}
					/>
				)}
			</main>
		</div>
	);
}

export default App;
