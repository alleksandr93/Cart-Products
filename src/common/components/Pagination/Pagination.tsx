import React from 'react';
import type {PaginationProps} from '../../../types/PaginationType.ts';
import style from './Pagination.module.css'

export const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   onPageChange,
                                                   maxVisiblePages = 5
                                               }) => {
    // Вычисляем диапазон отображаемых страниц
    const getVisiblePages = () => {
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(currentPage - half, 1);
        const end = Math.min(start + maxVisiblePages - 1, totalPages);

        // Корректируем start, если end близко к концу
        start = Math.max(end - maxVisiblePages + 1, 1);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();

    return (
        <div className={style.pagination}>
            {/* Кнопка "Назад" */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={style.paginationButton}
            >
                &laquo;
            </button>

            {/* Первая страница (если не видна) */}
            {!visiblePages.includes(1) && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={`${style.paginationButton} ${currentPage === 1 ? style.active : ''}`}
                    >
                        1
                    </button>
                    {visiblePages[0] > 2 && <span className="style.pagination-ellipsis">...</span>}
                </>
            )}

            {/* Видимые страницы */}
            {visiblePages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${style.paginationButton} ${currentPage === page ? style.active : ''}`}
                >
                    {page}
                </button>
            ))}

            {/* Последняя страница (если не видна) */}
            {!visiblePages.includes(totalPages) && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <span className={style.paginationEllipsis}>...</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={`${style.paginationButton} ${currentPage === totalPages ? style.active : ''}`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Кнопка "Вперед" */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={style.paginationButton}
            >
                &raquo;
            </button>
        </div>
    );
};

