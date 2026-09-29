interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages < 2) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, position) => position + 1);

  return (
    <nav aria-label="Product pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button type="button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40">
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
          className={`min-h-11 min-w-11 rounded-md border px-3 text-sm ${page === currentPage ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white hover:bg-slate-100"}`}
        >
          {page}
        </button>
      ))}
      <button type="button" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40">
        Next
      </button>
    </nav>
  );
}
