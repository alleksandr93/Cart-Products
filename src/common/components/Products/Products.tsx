import {useState} from 'react';
import styles from './products.module.css';
import {Card} from '../Card/Card.tsx';
import {Search} from '../Search/Search.tsx';
import {selectProducts} from '../../../slice/products-slice.ts';
import {useAppSelector} from '../hooks/useAppSelector.ts';
import {FilterButtons} from '../FilterButtons/FilterButtons.tsx';
import {Fade} from 'react-awesome-reveal';
import {AnimatePresence,motion} from 'framer-motion';


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
            <FilterButtons onAddClick={() => {}} />
            <div className={styles.cardsContainer}>
                <AnimatePresence>
                { searchStatus==='Not Found'? <p className={styles.notFound}>Not Found</p> : filterProducts().map((p) => (
                    <Fade triggerOnce key={p.id}>
                        <motion.div  style={{}}
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