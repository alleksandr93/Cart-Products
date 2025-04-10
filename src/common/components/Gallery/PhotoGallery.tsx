import {useEffect, useState} from 'react';
import styles from './PhotoGallery.module.css';
import {Pagination} from '../Pagination/Pagination.tsx';
import {Card} from '../Card/Card.tsx';
import type {Photo} from '../../../types/types.ts';
import axios from 'axios';

const accessKey = 'jt9pIrU2cLn-T6A-FMigGxJv9vXrXTFNVDAFIkfHmds';

export const PhotoGallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

    // Загрузка фотографий
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                setLoading(true);
                const perPage = 4;
                const response = await axios.get<Photo[]>(
                    `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=${perPage}&page=${currentPage}`
                );
                if (!response) throw new Error('Ошибка загрузки');
                const total = 32
                console.log('total', total);
                setTotalPages(Math.ceil(total / perPage));
                setPhotos(response.data);

                // Инициализация лайков
                const initialLikes = response.data.reduce((acc, photo) => {
                    acc[photo.id] = photo.liked_by_user;
                    return acc;
                }, {} as Record<string, boolean>);
                setLikedPhotos(initialLikes);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [currentPage]);

    const handleLike = async (photoId: string) => {
        try {
            // Оптимистичное обновление
            setLikedPhotos(prev => ({
                ...prev,
                [photoId]: !prev[photoId]
            }));

            setPhotos(prev => prev.map(photo =>
                photo.id === photoId
                    ? {
                        ...photo,
                        likes: likedPhotos[photoId] ? photo.likes - 1 : photo.likes + 1,
                        liked_by_user: !likedPhotos[photoId]
                    }
                    : photo
            ));

            // Реальный запрос к API
            const action = likedPhotos[photoId] ? 'unlike' : 'like';
            await fetch(
                `https://api.unsplash.com/photos/${photoId}/${action}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Client-ID YOUR_ACCESS_KEY',
                        'Accept-Version': 'v1'
                    }
                }
            );
        } catch (err) {
            // Откат изменений при ошибке
            setLikedPhotos(prev => ({
                ...prev,
                [photoId]: prev[photoId]
            }));

            setPhotos(prev => prev.map(photo =>
                photo.id === photoId
                    ? {
                        ...photo,
                        likes: likedPhotos[photoId] ? photo.likes : photo.likes - 1,
                        liked_by_user: likedPhotos[photoId]
                    }
                    : photo
            ));

            console.error('Ошибка при обновлении лайка:', err);
        }
    };

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <section className={styles.gallery}>
            <div className={styles.cardsContainer}>
                {photos.map(photo => (
                    <Card
                        key={photo.id}
                        photo={photo}
                        onLike={handleLike}
                        isLiked={likedPhotos[photo.id]}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </section>
    );
};