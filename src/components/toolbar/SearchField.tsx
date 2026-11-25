import type { Ref } from "react";

import searchUrl from "@/assets/search.svg";

interface SearchFieldProps {
	value: string;
	onChange: (query: string) => void;
	ref: Ref<HTMLInputElement>;
}

function SearchField({ value, onChange, ref }: SearchFieldProps) {
	return (
		<label className="relative ml-auto flex h-8 shrink-0 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm transition-colors focus-within:border-orange-500">
			<img src={searchUrl} alt="" />
			{!value && (
				<span
					aria-hidden="true"
					className="pointer-events-none absolute left-9 hidden text-gray-400 max-sm:block"
				>
					Buscar
				</span>
			)}
			<input
				aria-label="Buscar filas"
				className="toolbar-search outline-none max-sm:placeholder:text-transparent max-xs:w-24 xs:max-sm:w-20"
				placeholder="Buscar filas"
				ref={ref}
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</label>
	);
}

export default SearchField;
