import {useEffect, useState} from 'react';
import styles from './PhotoGallery.module.css';
import {Card} from '../Card/Card.tsx';
import type {BaseResponce, ProductsType} from '../../../types/types.ts';
import axios from 'axios';
import {Search} from '../Search/Search.tsx';
import {transformPhotosToProducts} from '../../utils/transformPhotosToProducts.ts';
import {useAppDispatch} from '../hooks/useAppDispatch.ts';
import {likeProductAC, selectProducts, setProductsAC} from '../../../reducers/products-slice.ts';
import {useAppSelector} from '../hooks/useAppSelector.ts';


const accessKey = 'jt9pIrU2cLn-T6A-FMigGxJv9vXrXTFNVDAFIkfHmds';

export const PhotoGallery = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredPhotos, setFilteredPhotos] = useState<ProductsType[]>([]);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);

    const products = useAppSelector(selectProducts)
    const dispatch = useAppDispatch()
    // Загрузка фотографий
    useEffect(() => {
        setLoading(true);
        const elements = 8;
        axios.get<BaseResponce>(
            `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=${elements}`
        ).then(res => {
            const products = transformPhotosToProducts(res.data);
            dispatch(setProductsAC({products}))

        })
            .catch((err) => {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            }).finally(() => {
            setLoading(false);
        })
    }, []);

    // Обработка лайков
    const handleLike = (productsId: string, like: boolean) => {
        dispatch(likeProductAC({id: productsId, like}));
    };

    // Функция фильтрации
    const filter = () => {
        if (filterStatus) {
            return products.filter((products) =>
                products.urlDescription.toLowerCase().includes(filterStatus.toLowerCase())
            );
        }
        return filteredPhotos.length > 0 ? filteredPhotos : products;
    };

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <section className={styles.gallery}>
            <Search
                filterStatus={setFilterStatus}
                filteredPhotos={filteredPhotos}
                data={products}
                setFilteredPhotos={setFilteredPhotos}
            />
            <div className={styles.cardsContainer}>
                {filter().map((p) => (
                    <Card
                        key={p.id}
                        products={p}
                        onLike={handleLike}

                    />
                ))}
            </div>
        </section>
    );
};