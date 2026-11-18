import FileSelector from "@features/csv/FileSelector";

import Brand from "./Brand";
import Divider from "./Divider";
import FileDetails from "./FileDetails";
import OpenFileButton from "./OpenFileButton";
import SearchField from "./SearchField";

interface ToolbarProps {
	fileName: string | null;
	shownRows: number;
	totalRows: number;
	columns: number;
	isLoading: boolean;
	query: string;
	onQueryChange: (query: string) => void;
	onFileSelected: (file: File) => void;
}

function Toolbar({
	fileName,
	shownRows,
	totalRows,
	columns,
	isLoading,
	query,
	onQueryChange,
	onFileSelected,
}: ToolbarProps) {
	return (
		<header className="flex h-12 shrink-0 items-center gap-3 border-b border-orange-100 bg-orange-50 px-4">
			<Brand />
			{fileName && (
				<>
					<Divider />
					<FileDetails
						columns={columns}
						fileName={fileName}
						shownRows={shownRows}
						totalRows={totalRows}
					/>
					<Divider />
				</>
			)}
			<div className="flex-1" />
			<SearchField onChange={onQueryChange} value={query} />
			<FileSelector disabled={isLoading} onFileSelected={onFileSelected}>
				<OpenFileButton disabled={isLoading} />
			</FileSelector>
		</header>
	);
}

export default Toolbar;
