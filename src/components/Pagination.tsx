import { buttonTone, chipTone } from "./ui";

interface PaginationProps {
	page: number;
	pageCount: number;
	onPageChange: (page: number) => void;
	className?: string | undefined;
}

function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
	const isFirstPage = page === 0;
	const isLastPage = page === pageCount - 1;

	return (
		<div className={`flex flex-wrap items-center gap-3 ${className}`}>
			<button
				className={`${buttonTone} ${isFirstPage ? "select-none" : ""}`}
				disabled={isFirstPage}
				onClick={() => onPageChange(page - 1)}
				type="button"
			>
				Anterior
			</button>
			<span className={`${chipTone} font-mono`}>
				Página {page + 1} de {pageCount}
			</span>
			<button
				className={`${buttonTone} ${isLastPage ? "select-none" : ""}`}
				disabled={isLastPage}
				onClick={() => onPageChange(page + 1)}
				type="button"
			>
				Siguiente
			</button>
		</div>
	);
}

export default Pagination;
