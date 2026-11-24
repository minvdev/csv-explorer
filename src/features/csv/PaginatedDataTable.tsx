import { useState } from "react";

import Pagination from "@components/Pagination";

import DataTable from "./DataTable";
import type { CsvRow } from "./types";

const PAGE_SIZE = 100;

interface PaginatedDataTableProps {
	headers: string[];
	rows: CsvRow[];
	selectedColumn: string | null;
	onSelectColumn: (column: string, trigger: HTMLButtonElement) => void;
	onSelectCell: (value: string, trigger: HTMLButtonElement) => void;
}

function PaginatedDataTable({
	headers,
	rows,
	selectedColumn,
	onSelectColumn,
	onSelectCell,
}: PaginatedDataTableProps) {
	const [page, setPage] = useState(0);
	const [lastRows, setLastRows] = useState(rows);

	if (rows !== lastRows) {
		setLastRows(rows);
		setPage(0);
	}

	const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount - 1);
	const visibleRows = rows.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

	return (
		<div className="flex min-h-full w-max min-w-full flex-col items-start gap-4 pb-2 max-xs:gap-2">
			<DataTable
				headers={headers}
				onSelectColumn={onSelectColumn}
				onSelectCell={onSelectCell}
				rows={visibleRows}
				selectedColumn={selectedColumn}
				startIndex={currentPage * PAGE_SIZE}
			/>
			<Pagination
				className="sticky left-4 mt-auto mb-2 ml-4 max-w-[calc(100vw-2rem)] max-xs:left-2 max-xs:mb-0 max-xs:ml-2 max-xs:max-w-[calc(100vw-1rem)]"
				onPageChange={setPage}
				page={currentPage}
				pageCount={pageCount}
			/>
		</div>
	);
}

export default PaginatedDataTable;
