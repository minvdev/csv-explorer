import type { CsvData } from "./types";

interface DataTableProps {
	data: CsvData;
	selectedColumn: string | null;
	onSelectColumn: (column: string) => void;
}

function DataTable({ data, selectedColumn, onSelectColumn }: DataTableProps) {
	return (
		<table>
			<thead>
				<tr>
					{data.headers.map((header) => (
						<th
							className={`border px-2 py-1 ${header === selectedColumn ? "bg-gray-100" : ""}`}
							key={header}
						>
							<button
								className="w-full cursor-pointer"
								type="button"
								onClick={() => onSelectColumn(header)}
							>
								{header}
							</button>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.rows.map((row, index) => (
					<tr key={index}>
						{data.headers.map((header) => (
							<td className="border px-2 py-1" key={header}>
								{row[header]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default DataTable;
