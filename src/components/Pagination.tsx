interface PaginationProps {
	page: number;
	pageCount: number;
	onPageChange: (page: number) => void;
}

function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
	return (
		<div>
			<button disabled={page === 0} onClick={() => onPageChange(page - 1)} type="button">
				Anterior
			</button>
			<span>
				Página {page + 1} de {pageCount}
			</span>
			<button
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
