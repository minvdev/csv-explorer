import { useState } from "react";

import Pagination from "@components/Pagination";

import ColumnStats from "./ColumnStats";
import DataTable from "./DataTable";
import type { CsvData } from "./types";

const PAGE_SIZE = 30;

interface PaginatedDataTableProps {
	data: CsvData;
}

function PaginatedDataTable({ data }: PaginatedDataTableProps) {
	const [page, setPage] = useState(0);
	const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
	const [lastData, setLastData] = useState(data);

	if (data !== lastData) {
		setLastData(data);
		setPage(0);
		if (selectedColumn !== null && !data.headers.includes(selectedColumn)) {
			setSelectedColumn(null);
		}
	}

	const handleSelectColumn = (column: string) => {
		setSelectedColumn((current) => (current === column ? null : column));
	};

	const pageCount = Math.max(1, Math.ceil(data.rows.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount - 1);
	const visibleRows = data.rows.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

	return (
		<div className="flex flex-col items-start gap-2 pb-2">
			{selectedColumn && <ColumnStats header={selectedColumn} rows={data.rows} />}
			<DataTable
				data={{ headers: data.headers, rows: visibleRows, warnings: data.warnings }}
				onSelectColumn={handleSelectColumn}
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
