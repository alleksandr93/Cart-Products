
import {useAppSelector} from '../hooks/useAppSelector.ts';
import {selectProducts} from '../../../slice/products-slice.ts';
import {Card} from '../Card/Card.tsx';
import styles from './productPage.module.css';
import {useNavigate, useParams} from 'react-router';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {ProductNotFound} from '../ProductNotFound/ProductNotFound.tsx';

export const ProductPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const products = useAppSelector(selectProducts);
    const product = products.find(p => p.id === id);

    const handleGoBack = () => {
        // Возвращаемся на предыдущую страницу
        navigate(-1);

    };
    if (!product) {
        return (
            <div className={styles.notFoundContainer}>
                <ProductNotFound />
                <button
                    onClick={handleGoBack}
                    className={styles.backButton}
                >
                    <AiOutlineArrowLeft /> Back to Gallery
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button
                onClick={handleGoBack}
                className={styles.backButton}
            >
                <AiOutlineArrowLeft /> Back to Gallery
            </button>

            <h1 className={styles.title}>Product Details</h1>
            <div className={styles.cardWrapper}>
                <Card
                    products={product}

                />
            </div>
        </div>
    );
};