// Search.tsx (дочерний компонент)
import {useState} from 'react';
import style from './search.module.css';
import type {ProductsType} from '../../../types/types.ts';

type Props = {
    filterStatus: (status: string | null) => void;
    products: ProductsType[];
}

export const Search = ({ filterStatus, products }: Props) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);

        if (value.length > 0) {
            const filteredResults = products.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase())
            );

            if (filteredResults.length > 0) {
                filterStatus(value); // Устанавливаем поисковый запрос как статус
            } else {
                filterStatus('Not Found');
            }
        } else {
            filterStatus(null); // Сбрасываем фильтрацию
        }
    };

    return (
        <div className={style.searchWrapper}>
            <div className={style.searchContainer}>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by authors"
                    className={style.searchInput}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchValue)}
                />
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.searchIcon}
                >
                    <path
                        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>
        </div>
    );
};