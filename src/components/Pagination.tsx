import { buttonTone, chipTone } from "./ui";

interface PaginationProps {
	page: number;
	pageCount: number;
	onPageChange: (page: number) => void;
	className?: string | undefined;
}

function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
	return (
		<div className={`flex items-center gap-3 ${className}`}>
			<button
				className={buttonTone}
				disabled={page === 0}
				onClick={() => onPageChange(page - 1)}
				type="button"
			>
				Anterior
			</button>
			<span className={`${chipTone} font-mono`}>
				Página {page + 1} de {pageCount}
			</span>
			<button
				className={buttonTone}
				disabled={page === pageCount - 1}
				onClick={() => onPageChange(page + 1)}
				type="button"
			>
				Siguiente
			</button>
		</div>
	);
}

export default Pagination;
