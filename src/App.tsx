import { useMemo, useRef, useState } from "react";

import StatusBar from "@components/status/StatusBar";
import type { StatusId } from "@components/status/StatusContext";
import StatusProvider from "@components/status/StatusProvider";
import { useStatus } from "@components/status/useStatus";
import Toolbar from "@components/toolbar/Toolbar";
import ColumnDetailsPanel from "@features/csv/ColumnDetailsPanel";
import filterRows, { hasResults } from "@features/csv/filterRows";
import PaginatedDataTable from "@features/csv/PaginatedDataTable";
import parseCsv, { CsvParseError } from "@features/csv/parseCsv";
import type { CsvData } from "@features/csv/types";
import EmptyState from "@features/empty-state/EmptyState";

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
	const [isLoading, setIsLoading] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
	const noResultsIdRef = useRef<StatusId | null>(null);
	const selectedColumnTriggerRef = useRef<HTMLButtonElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const filteredRows = useMemo(
		() => (loaded ? filterRows(loaded.data.rows, query) : []),
		[loaded, query],
	);

	const handleFileSelected = async (file: File) => {
		setSelectedColumn(null);
		setLoaded(null);
		setQuery("");
		clearStatuses();
		noResultsIdRef.current = null;
		setIsLoading(true);
		const loadingId = showStatus("Cargando archivo…", "info");

		try {
			const parsed = await parseCsv(await file.text());
			setLoaded({ data: parsed, fileName: file.name });
			if (parsed.warnings.length > 0) {
				showStatus(WARNING_MESSAGE, "warning", true);
			}
		} catch (caught) {
			setLoaded(null);
			showStatus(
				caught instanceof CsvParseError
					? ERROR_MESSAGES[caught.kind]
					: "No se ha podido cargar el archivo",
				"error",
				true,
			);
		} finally {
			removeStatus(loadingId);
			setIsLoading(false);
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

	const handleSelectColumn = (column: string, trigger: HTMLButtonElement) => {
		selectedColumnTriggerRef.current = trigger;
		setSelectedColumn(selectedColumn === column ? null : column);
	};

	const handleCloseColumnDetails = () => {
		setSelectedColumn(null);
		if (selectedColumnTriggerRef.current?.isConnected) {
			selectedColumnTriggerRef.current.focus();
		} else {
			searchInputRef.current?.focus();
		}
	};

	return (
		<div className="flex h-dvh flex-col">
			<Toolbar
				columns={loaded?.data.headers.length ?? 0}
				fileName={loaded?.fileName ?? null}
				onFileSelected={handleFileSelected}
				onQueryChange={handleQueryChange}
				query={query}
				searchInputRef={searchInputRef}
				isLoading={isLoading}
				shownRows={loaded ? filteredRows.length : 0}
				totalRows={loaded?.data.rows.length ?? 0}
			/>
			<div className="flex min-h-0 flex-1">
				<div className="flex min-w-0 flex-1 flex-col">
					<StatusBar />
					<main className="min-h-0 flex-1 overflow-y-auto">
						{loaded === null && (
							<EmptyState isLoading={isLoading} onFileSelected={handleFileSelected} />
						)}
						{loaded && filteredRows.length > 0 && (
							<PaginatedDataTable
								headers={loaded.data.headers}
								onSelectColumn={handleSelectColumn}
								rows={filteredRows}
								selectedColumn={selectedColumn}
							/>
						)}
					</main>
				</div>
				{loaded && selectedColumn !== null && (
					<ColumnDetailsPanel
						column={selectedColumn}
						onClose={handleCloseColumnDetails}
						rows={filteredRows}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
