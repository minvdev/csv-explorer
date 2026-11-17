import { useState } from "react";

import Pagination from "@components/Pagination";

import DataTable from "./DataTable";
import type { CsvData } from "./types";

const PAGE_SIZE = 30;

interface PaginatedDataTableProps {
	data: CsvData;
	selectedColumn: string | null;
	onSelectColumn: (column: string) => void;
}

function PaginatedDataTable({ data, selectedColumn, onSelectColumn }: PaginatedDataTableProps) {
	const [page, setPage] = useState(0);
	const [lastData, setLastData] = useState(data);

	if (data !== lastData) {
		setLastData(data);
		setPage(0);
	}

	const pageCount = Math.max(1, Math.ceil(data.rows.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount - 1);
	const visibleRows = data.rows.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

	return (
		<div className="flex flex-col items-start gap-2 pb-2">
			<DataTable
				data={{ headers: data.headers, rows: visibleRows, warnings: data.warnings }}
				onSelectColumn={onSelectColumn}
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
