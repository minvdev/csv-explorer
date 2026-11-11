import { useState } from "react";

import FileSelector from "./features/csv/FileSelector";
import parseCsv from "./features/csv/parseCsv";
import type { CsvData } from "./features/csv/types";

function App() {
	const [_data, setData] = useState<CsvData | null>(null);

	const handleFileSelected = async (file: File) => {
		try {
			const text = await file.text();
			setData(parseCsv(text));
		} catch {
			setData(null);
		}
	};

	return <FileSelector onFileSelected={handleFileSelected} />;
}

export default App;
