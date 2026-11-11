import { useState } from "react";

import FileSelector from "./features/csv/FileSelector";

function App() {
	const [file, setFile] = useState<File | null>(null);

	return (
		<>
			<FileSelector onFileSelected={setFile} />
			{file && <p>Archivo seleccionado: {file.name}</p>}
		</>
	);
}

export default App;
