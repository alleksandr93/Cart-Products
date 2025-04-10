import {useState} from 'react';
import styles from './PhotoGallery.module.css';
import {Card} from '../Card/Card.tsx';
import {Search} from '../Search/Search.tsx';
import {selectProducts} from '../../../slice/products-slice.ts';
import {useAppSelector} from '../hooks/useAppSelector.ts';
import {FilterButtons} from '../FilterButtons/FilterButtons.tsx';


export const PhotoGallery = () => {

    const [searchStatus, setSearchStatus] = useState<string | null>(null);


    const products = useAppSelector(selectProducts);


    // Функция фильтрации
    const filterProducts = () => {
        if (searchStatus === 'Not Found') {
            return [];
        }

        if (searchStatus) {
            return products.filter(product =>
                product.description.toLowerCase().includes(searchStatus.toLowerCase())
            );
        }

        return products;
    };



    return (
        <section className={styles.gallery}>
            <Search
                filterStatus={setSearchStatus}
                products={products}
            />
            <FilterButtons onAddClick={() => {}} />
            <div className={styles.cardsContainer}>
                { searchStatus==='Not Found'? <p className={styles.notFound}>Not Found</p> : filterProducts().map((p) => (
                    <Card
                        key={p.id}
                        products={p}
                    />
                ))}
            </div>
        </section>
    );
};