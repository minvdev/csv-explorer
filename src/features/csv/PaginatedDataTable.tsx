import { useState } from "react";

import Pagination from "@components/Pagination";

import DataTable from "./DataTable";
import type { CsvRow } from "./types";

const PAGE_SIZE = 30;

interface PaginatedDataTableProps {
	headers: string[];
	rows: CsvRow[];
	selectedColumn: string | null;
	onSelectColumn: (column: string) => void;
}

function PaginatedDataTable({
	headers,
	rows,
	selectedColumn,
	onSelectColumn,
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
		<div className="flex flex-col items-start gap-2 pb-2">
			<DataTable
				headers={headers}
				onSelectColumn={onSelectColumn}
				rows={visibleRows}
				selectedColumn={selectedColumn}
				startIndex={currentPage * PAGE_SIZE}
			/>
			<Pagination
				className={"ml-2"}
				onPageChange={setPage}
				page={currentPage}
				pageCount={pageCount}
			/>
		</div>
	);
}

export default PaginatedDataTable;
