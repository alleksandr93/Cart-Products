import styles from './Card.module.css';
import {useState} from 'react';
import type {Photo} from '../../../types/types.ts';
import { AiFillDelete } from "react-icons/ai";

type CardProps = {
    photo: Photo;
    onLike: (photoId: string) => void;
    isLiked: boolean;
}

export const Card = ({photo, onLike, isLiked}: CardProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async (photoId: string) => {
        setIsLoading(true);
        try {
            await onLike(photoId);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.card}>
            {/* Изображение */}
            <img
                src={photo.urls.small}
                alt={photo.alt_description || 'Фото'}
                className={styles.image}
                loading="lazy" // Ленивая загрузка
            />

            {/* Контент карточки */}
            <div className={styles.content}>
                <div className={styles.author}>
                    {photo.user.profile_image?.small && (
                        <img
                            src={photo.user.profile_image.small}
                            alt={photo.user.name}
                            className={styles.avatar}
                        />
                    )}
                    <h2 className={styles.title}>{photo.user.name}</h2>
                    {/* Кнопка лайка */}
                    <button
                        onClick={() => handleLike(photo.id)}
                        disabled={isLoading}
                        className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
                        aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
                    >
                        <span className={styles.heartIcon}>♥</span>
                        <span className={styles.likesCount}>
                        {isLoading ? '...' : photo.likes}
                    </span>
                    </button>
                </div>
                <p className={styles.description}>
                    {photo.description ? photo.description : 'no description'}
                </p>
                <button className={styles.btnDelete} >
                    <AiFillDelete  size={'2rem'} />
                </button>
            </div>
        </div>
    );
}