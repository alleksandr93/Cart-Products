import styles from './home.module.css'
import Typewriter from 'typewriter-effect';

export const Home = () => {
    return (
        <main className={styles.mainWrapper}>
            <div className={styles.info}>
                <h1  className={styles.titleH1}>
                   Welcome to my gallery!
                </h1>
                <div className={styles.title}>
                    <Typewriter  options={{
                        strings: ['Welcome to my gallery!',],
                        autoStart: true,
                        loop: true,
                    }}/>
                </div>

            </div>
        </main>
    );
};

