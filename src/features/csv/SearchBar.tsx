interface SearchBarProps {
	value: string;
	onChange: (query: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<input
			aria-label="Buscar"
			placeholder="Buscar…"
			type="search"
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	);
}

export default SearchBar;
