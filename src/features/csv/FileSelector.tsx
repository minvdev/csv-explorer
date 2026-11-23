import { useRef, type ReactNode } from "react";

interface FileSelectorProps {
	onFileSelected: (file: File) => void;
	disabled?: boolean;
	children: ReactNode;
}

function FileSelector({ onFileSelected, disabled = false, children }: FileSelectorProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (file) {
			onFileSelected(file);
		}
	};

	return (
		<>
			<input
				accept=".csv,text/csv"
				aria-hidden="true"
				className="sr-only"
				disabled={disabled}
				ref={inputRef}
				tabIndex={-1}
				type="file"
				onChange={handleChange}
			/>
			<button
				className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
				disabled={disabled}
				type="button"
				onClick={() => inputRef.current?.click()}
			>
				{children}
			</button>
		</>
	);
}

export default FileSelector;
