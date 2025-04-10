import styles from './Card.module.css';
import {useState} from 'react';
import {AiFillDelete} from 'react-icons/ai';
import type {ProductsType} from '../../../types/types.ts';
import {useAppDispatch} from '../hooks/useAppDispatch.ts';
import {deleteProductAC, likeProductAC} from '../../../slice/products-slice.ts';
import {useNavigate} from 'react-router';


type CardProps = {
    products: ProductsType;

}

export const Card = ({products}: CardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLike = async (productsId: string, like: boolean) => {
        setIsLoading(true);
        dispatch(likeProductAC({id:productsId, like}));
        setIsLoading(false);
    }

    const handleDelete = () => {
        setIsLoading(true);
        dispatch(deleteProductAC({productId: products.id}));
        setIsLoading(false);
    }

    const handleCardClick = (e: React.MouseEvent) => {
        // Проверяем, не был ли клик по лайку или кнопке удаления
        const target = e.target as HTMLElement;
        const isLikeClicked = target.closest(`.${styles.likeButton}`);
        const isDeleteClicked = target.closest(`.${styles.btnDelete}`);

        if (!isLikeClicked && !isDeleteClicked) {
            navigate(`/products/${products.id}`);
        }
    }

    return (
        <div className={styles.card} onClick={handleCardClick}>
            {/* Изображение */}
            <img
                src={products.imageUrl}
                alt={products.description || 'Photo'}
                className={styles.image}
                loading="lazy"
            />

            {/* Контент карточки */}
            <div className={styles.content}>
                <div className={styles.author}>
                    {products.avatarUrl && (
                        <img
                            src={products.avatarUrl}
                            alt={products.title}
                            className={styles.avatar}
                        />
                    )}
                    <h2 className={styles.title}>{products.title}</h2>
                    {/* Кнопка лайка */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLike(products.id, products.like);
                        }}
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
                    {products.description ? products.description : 'no description'}
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                    className={styles.btnDelete}
                >
                    <AiFillDelete size={'2rem'}/>
                </button>
            </div>
        </div>
    );
}