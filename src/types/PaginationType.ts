export type PaginationProps ={
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number; // Максимальное количество видимых номеров страниц
}