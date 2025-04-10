import {useState} from 'react';
import styles from './products.module.css';
import {Card} from '../Card/Card.tsx';
import {Search} from '../Search/Search.tsx';
import {selectProducts} from '../../../slice/products-slice.ts';
import {useAppSelector} from '../hooks/useAppSelector.ts';
import {FilterButtons} from '../FilterButtons/FilterButtons.tsx';
import {Fade} from 'react-awesome-reveal';
import {AnimatePresence,motion} from 'framer-motion';
import {ProductNotFound} from '../ProductNotFound/ProductNotFound.tsx';



export const Products = () => {

    const [searchStatus, setSearchStatus] = useState<string | null>(null);


    const products = useAppSelector(selectProducts);

    console.log(products);
    // Функция фильтрации
    const filterProducts = () => {
        if (searchStatus === 'Not Found') {
            return [];
        }

        if (searchStatus) {
            return products.filter(product =>
                product.title.toLowerCase().includes(searchStatus.toLowerCase())
            );
        }

        return products;
    };



    return (
        <section className={styles.gallery}>
            <Search
                filterStatus={setSearchStatus}
                products={products}
            />
            <FilterButtons  />

            <div className={styles.cardsContainer}>
                <AnimatePresence>
                { searchStatus==='Not Found'? <div className={styles.notFound}><ProductNotFound  /> </div> : filterProducts().map((p) => (
                    <Fade triggerOnce key={p.id}>
                        <motion.div
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    layout>
                        <Card products={p}/>
                        </motion.div>
                    </Fade>

                ))}
                </AnimatePresence>

            </div>
        </section>
    );
};