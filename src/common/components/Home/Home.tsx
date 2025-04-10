import styles from './home.module.css'
import { FaLongArrowAltUp } from "react-icons/fa";

export const Home = () => {
    return (
        <main className={styles.mainWrapper}>
            <div className={styles.info}>
                <FaLongArrowAltUp size={'10rem'} />
                <h1>
                    Нажмите на Products
                </h1>
            </div>
        </main>
    );
};

