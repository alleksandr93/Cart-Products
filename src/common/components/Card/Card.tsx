import styles from './Card.module.css';
import {useState} from 'react';

import {AiFillDelete} from 'react-icons/ai';
import type {ProductsType} from '../../../types/types.ts';
import {useAppDispatch} from '../hooks/useAppDispatch.ts';
import {deleteProductAC} from '../../../reducers/products-slice.ts';

type CardProps = {
    products: ProductsType;
    onLike: (productsId: string, like: boolean) => void;

}

export const Card = ({products, onLike}: CardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();


    const handleLike = async (productsId: string, like: boolean) => {
        setIsLoading(true);
        onLike(productsId, like);
        setIsLoading(false);

    }
    const handleDelete = () => {
        setIsLoading(true);

        dispatch(deleteProductAC({productId:products.id}))
        setIsLoading(false);

    }
    return (
        <div className={styles.card}>
            {/* Изображение */}
            <img
                src={products.urlImg}
                alt={products.urlDescription || 'Фото'}
                className={styles.image}
                loading="lazy" // Ленивая загрузка
            />

            {/* Контент карточки */}
            <div className={styles.content}>
                <div className={styles.author}>
                    {products.photoUserProfile && (
                        <img
                            src={products.photoUserProfile}
                            alt={products.nameUser}
                            className={styles.avatar}
                        />
                    )}
                    <h2 className={styles.title}>{products.nameUser}</h2>
                    {/* Кнопка лайка */}
                    <button
                        onClick={() => handleLike(products.id, products.like)}
                        disabled={isLoading}
                        className={`${styles.likeButton} ${products.like ? styles.liked : ''}`}
                        aria-label={products.like ? 'Убрать лайк' : 'Поставить лайк'}
                    >
                        <span className={styles.heartIcon}>♥</span>
                        <span className={styles.likesCount}>
                        {isLoading ? '...' : products.numberLike}
                    </span>
                    </button>
                </div>
                <p className={styles.description}>
                    {products.urlDescription ? products.urlDescription : 'no description'}
                </p>
                <button onClick={handleDelete} className={styles.btnDelete}>
                    <AiFillDelete size={'2rem'}/>
                </button>
            </div>
        </div>
    );
}