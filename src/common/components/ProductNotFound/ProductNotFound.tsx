import styles from './productNotFound.module.css';


export const ProductNotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.illustration}>
                    <span className={styles.emoji}>😕</span>
                    <div className={styles.shadow}></div>
                </div>

                <h1 className={styles.title}>Product not found</h1>

                <p className={styles.message}>
                    Unfortunately, the product you requested is unavailable or has been removed.
                </p>


            </div>
        </div>
    );
};