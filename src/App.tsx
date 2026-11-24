import { useMemo, useRef, useState } from "react";

import DetailsPanel, { DETAILS_PANEL_ID } from "@components/DetailsPanel";
import StatusBar from "@components/status/StatusBar";
import type { StatusId } from "@components/status/StatusContext";
import StatusProvider from "@components/status/StatusProvider";
import { useStatus } from "@components/status/useStatus";
import Toolbar from "@components/toolbar/Toolbar";
import ColumnDetailsContent from "@features/csv/ColumnDetailsContent";
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

type SelectedDetails =
	| { kind: "column"; value: string; trigger: HTMLButtonElement }
	| { kind: "cell"; value: string; trigger: HTMLButtonElement };

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
	const [selectedDetails, setSelectedDetails] = useState<SelectedDetails | null>(null);
	const noResultsIdRef = useRef<StatusId | null>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const filteredRows = useMemo(
		() => (loaded ? filterRows(loaded.data.rows, query) : []),
		[loaded, query],
	);

	const handleFileSelected = async (file: File) => {
		setSelectedDetails(null);
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
		setSelectedDetails((current) =>
			current?.kind === "column" && current.value === column
				? null
				: { kind: "column", value: column, trigger },
		);
	};

	const handleSelectCell = (value: string, trigger: HTMLButtonElement) => {
		setSelectedDetails({ kind: "cell", value, trigger });
	};

	const handleCloseColumnDetails = () => {
		setSelectedDetails(null);
		if (selectedDetails?.trigger.isConnected && !selectedDetails.trigger.disabled) {
			selectedDetails.trigger.focus();
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
			<div className="relative flex min-h-0 flex-1">
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
								onSelectCell={handleSelectCell}
								rows={filteredRows}
								selectedColumn={
									selectedDetails?.kind === "column"
										? selectedDetails.column
										: null
								}
							/>
						)}
					</main>
				</div>
				{loaded && selectedDetails && (
					<DetailsPanel
						id={DETAILS_PANEL_ID}
						label={
							selectedDetails.kind === "column"
								? `Detalles de la columna ${selectedDetails.value}`
								: "Detalles de la celda"
						}
						onClose={handleCloseColumnDetails}
						title={selectedDetails.value}
					>
						{selectedDetails.kind === "column" ? (
							<ColumnDetailsContent
								column={selectedDetails.value}
								rows={filteredRows}
							/>
						) : (
							<p className="wrap-anywhere whitespace-pre-wrap">
								{selectedDetails.value}
							</p>
						)}
					</DetailsPanel>
				)}
			</div>
		</div>
	);
}

export default App;
