import { useState } from "react";

import Pagination from "@components/Pagination";

import DataTable from "./DataTable";
import type { CsvData } from "./types";

const PAGE_SIZE = 30;

interface PaginatedDataTableProps {
	data: CsvData;
}

function PaginatedDataTable({ data }: PaginatedDataTableProps) {
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
		<>
			<DataTable data={{ headers: data.headers, rows: visibleRows }} />
			<Pagination onPageChange={setPage} page={currentPage} pageCount={pageCount} />
		</>
	);
}

export default PaginatedDataTable;
