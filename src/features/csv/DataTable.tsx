import type { CsvData } from "./types";

interface DataTableProps {
	data: CsvData;
}

function DataTable({ data }: DataTableProps) {
	return (
		<table>
			<thead>
				<tr>
					{data.headers.map((header) => (
						<th className="border px-2 py-1" key={header}>
							{header}
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
