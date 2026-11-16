import searchUrl from "@/assets/search.svg";

interface SearchFieldProps {
	value: string;
	onChange: (query: string) => void;
}

function SearchField({ value, onChange }: SearchFieldProps) {
	return (
		<label className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm">
			<img src={searchUrl} alt="" />
			<input
				aria-label="Buscar filas"
				placeholder="Buscar filas"
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</label>
	);
}

export default SearchField;
