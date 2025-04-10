import {Header} from '../common/components/Header/Header.tsx';
import {Routing} from '../common/components/Routing/Routing.tsx';
import {useEffect, useState} from 'react';
import axios from 'axios';
import type {BaseResponce} from '../types/types.ts';
import {transformPhotosToProducts} from '../common/utils/transformPhotosToProducts.ts';
import {setProductsAC} from '../slice/products-slice.ts';
import {useAppDispatch} from '../common/components/hooks/useAppDispatch.ts';
import styles from './app.module.css';



export const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setLoading(true);
        const elements = 10;
        axios.get<BaseResponce>(
            `https://api.unsplash.com/photos?client_id=${import.meta.env.VITE_AUTH_TOKEN}&per_page=${elements}`
        ).then(res => {
            const products = transformPhotosToProducts(res.data);
            dispatch(setProductsAC({products}));


        })
            .catch((err) => {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    return (
        <div className={styles.app}>
            <Header/>
            <Routing/>
        </div>

    );
};

